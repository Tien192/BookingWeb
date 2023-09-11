import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import {
  DiaDiemDto,
  DiaDiemFullDto,
  DiaDiemServiceProxy,
  InfoBookingDto,
  PhongSearchinhFilterDto,
  SearchingFilterServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BookingInfoService } from "../service/booking-info-service.service";
import { now } from "moment";
@Component({
  selector: "app-luutru",
  templateUrl: "./luutru.component.html",
  styleUrls: ["./luutru.component.css"],
  providers: [MessageService],
})
export class LuutruComponent {
  @Input() HienTrangChu = true;
  formTimPhong: FormGroup;

  diadiemDto: DiaDiemDto = new DiaDiemDto();
  suggestionsDiaDiem: DiaDiemFullDto[];

  inforBookingDto: InfoBookingDto = new InfoBookingDto();

  selectedDiadiem: any;
  filteredDiadiems: any[];
  rangeDates: Date[];
  showTimKiemGanDay = false;

  adults = 0;
  children = 0;
  rooms = 0;
  iddiadiem = 0;

  phongSearchinhFilterDto: PhongSearchinhFilterDto[];
  constructor(
    private _diadiemService: DiaDiemServiceProxy,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private _searchingFilterService: SearchingFilterServiceProxy,
    private bookingInfoService: BookingInfoService
  ) {}

  overlayVisible: boolean = false;

  ngOnInit() {
    // this.activatedRoute.params.subscribe((params) => {
    //   this.HienTrangChu = true;
    // });
    this.createForm();
  }

  createForm() {
    this.formTimPhong = this.formBuilder.group({
      timkiemData: this.formBuilder.group({
        locations: [null, Validators.required],
        rangeDates: [now, Validators.required],
        adults: [2, Validators.min(1)],
        children: [0, Validators.min(0)],
        rooms: [1, Validators.min(1)],
      }),
      group1: this.formBuilder.control([]), // Use this.formBuilder.control instead of array notation
    });
  }

  searchDiaDiem(event) {
    const query = event.query;
    this._diadiemService.getAllLocations().subscribe((result) => {
      this.suggestionsDiaDiem = this.filterDiadiem(query, result);
    });
  }

  filterDiadiem(query, diaDiem: DiaDiemFullDto[]): any[] {
    const filter: any[] = [];
    for (const i of diaDiem) {
      if (i.tenDiaDiem.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filter.push(i);
      }
    }
    return filter;
  }

  incrementDecrement(field: string, value: number) {
    if (this.formTimPhong.get(`timkiemData.${field}`).value + value >= 0) {
      this.formTimPhong
        .get(`timkiemData.${field}`)
        .patchValue(
          this.formTimPhong.get(`timkiemData.${field}`).value + value
        );
    }
  }

  onSubmit() {
    this.inforBookingDto.diaDiemid =
      this.formTimPhong.value.timkiemData.locations?.id;

    this.iddiadiem = this.formTimPhong.value.timkiemData.locations?.id;

    this.inforBookingDto.ngayDat =
      this.formTimPhong.value.timkiemData?.rangeDates[0];

    this.inforBookingDto.ngayTra =
      this.formTimPhong.value.timkiemData?.rangeDates[1];

    this.inforBookingDto.slNguoiLon =
      this.formTimPhong.value.timkiemData?.adults;
    this.inforBookingDto.slTreEm =
      this.formTimPhong.value.timkiemData?.children;
    this.inforBookingDto.slPhong = this.formTimPhong.value.timkiemData?.rooms;

    this._searchingFilterService
      .searchingRoom(this.inforBookingDto)
      .subscribe((result) => {
        this.phongSearchinhFilterDto = result;
        this.bookingInfoService.setBookingInfo(this.phongSearchinhFilterDto);

        console.log("Gui du lieu 1:", this.phongSearchinhFilterDto);
      });

    this.bookingInfoService.setSearchBookingInfo(this.inforBookingDto);
    console.log("Gui du lieu 2:", this.inforBookingDto);

    this.showTimKiemGanDay = true;
  }
  AnTrangChuOnSubmit() {
    this.HienTrangChu = false;
  }

  toggleForm() {
    this.overlayVisible = !this.overlayVisible;
  }

  searchHotels() {}
}
