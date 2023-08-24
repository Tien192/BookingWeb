import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { BookingInfoService } from "@app/service/booking-info-service.service";
import {
  ClientBookRoomInputDto,
  ClientBookRoomOutputDto,
  PhongServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-thongtinlienhe",
  templateUrl: "./thongtinlienhe.component.html",
  styleUrls: ["./thongtinlienhe.component.css"],
})
export class ThongtinlienheComponent {
  FormThongTinLienHe: FormGroup;
  FormYeuCauDacBiet: FormGroup;

  infoClient: ClientBookRoomOutputDto;

  selectedloaiphong: any;
  selectedphong: any;

  id: number;
  idloaiphong: number;
  yeucaus: any[] = [
    { name: "Phòng không hút thuốc", key: "NoSmoke" },
    { name: "Phòng liên thông", key: "Connect" },
    { name: "Tầng lầu", key: "TopFloor" },
    { name: "Khác", key: "More" },
  ];
  dathos: any[] = [
    { name: "Tôi là khách lưu trú", key: 1 },
    { name: "Tôi đặt cho người khác", key: 2 },
  ];
  clientBookRoomInputDto: ClientBookRoomInputDto = new ClientBookRoomInputDto();
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _phongService: PhongServiceProxy,
    private bookingInfoService: BookingInfoService
  ) {}

  ngOnInit() {
    this.initAPI();
    this.initForm();
  }

  private initAPI() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
    this.route.params.subscribe((params: Params) => {
      this.idloaiphong = +params["idloaiphong"];
    });

    this._phongService.getRoomById(this.id).subscribe((result) => {
      this.selectedphong = result;
    });
    this._phongService
      .getInfoRoomToBook(this.idloaiphong)
      .subscribe((result) => {
        this.selectedloaiphong = result;
        this.bookingInfoService.setRoomInfo(this.selectedloaiphong);
      });
  }

  private initForm() {
    this.FormThongTinLienHe = this.formBuilder.group({
      name: ["", Validators.required],
      cccd: ["", [Validators.required, Validators.pattern(/^\d{12}$/)]], // Remove Validators.required
      phone: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [
        "",
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      datho: this.dathos[0],
    });
    this.FormYeuCauDacBiet = this.formBuilder.group({
      selectedCategory: ["", Validators.required],
    });
  }

  onSubmit() {
    console.log(this.selectedloaiphong.value);
  }

  addClientBookRoom() {
    this.clientBookRoomInputDto.hoTen = this.FormThongTinLienHe.value.name;
    this.clientBookRoomInputDto.cccd = this.FormThongTinLienHe.value.cccd;
    this.clientBookRoomInputDto.sdt = this.FormThongTinLienHe.value.phone;
    this.clientBookRoomInputDto.email = this.FormThongTinLienHe.value.email;
    this.clientBookRoomInputDto.datHo = this.FormThongTinLienHe.value.datho.key;
    this.clientBookRoomInputDto.yeuCauDacBiet =
      this.FormYeuCauDacBiet.value.selectedCategory.key;

    this._phongService.clientBookRoom(this.clientBookRoomInputDto).subscribe(
      (result) => {
        this.infoClient = result;
        this.bookingInfoService.setClientInfo(this.infoClient);
        console.log(this.infoClient);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
