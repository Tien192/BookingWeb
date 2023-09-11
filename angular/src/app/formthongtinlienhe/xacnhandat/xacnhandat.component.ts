import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { BookingInfoService } from "@app/service/booking-info-service.service";
import {
  ChinhSachChungOutoutDto,
  ChinhSachChungServiceProxy,
  ClientBookRoomOutputDto,
  ConfirmDto,
  GetInfoRoomToBookOutputDto,
  InfoBookingDto,
  PhongServiceProxy,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-thongtinlienhe",
  templateUrl: "./xacnhandat.component.html",
  styleUrls: ["./xacnhandat.component.css"],
})
export class XacnhandatComponent {
  formLich: FormGroup;
  FormYeuCauDacBiet: FormGroup;

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

  chinhsachchung: ChinhSachChungOutoutDto = new ChinhSachChungOutoutDto();

  infoRoom: GetInfoRoomToBookOutputDto | undefined;
  infoClient: ClientBookRoomOutputDto | undefined;
  infoBooking: InfoBookingDto | undefined;

  confirmBook: ConfirmDto = new ConfirmDto();

  constructor(
    private route: ActivatedRoute,

    private messageService: MessageService,
    private _phongService: PhongServiceProxy,
    private bookingInfo: BookingInfoService,
    private _chinhSachChung: ChinhSachChungServiceProxy
  ) {}

  ngOnInit() {
    this.infoBooking = new InfoBookingDto();
    this.infoClient = new ClientBookRoomOutputDto();
    this.infoRoom = new GetInfoRoomToBookOutputDto();

    this.initAPI();
  }

  private initAPI() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });
    this.route.params.subscribe((params: Params) => {
      this.idloaiphong = +params["idloaiphong"];
    });

    this._phongService.getRoomById(this.id).subscribe(
      (result) => {
        this.selectedphong = result;
        this._chinhSachChung
          .getPolicyByDVKDId(this.selectedloaiphong.donViKinhDoanhId)
          .subscribe(
            (result) => {
              this.chinhsachchung = result;
            },
            (error) => {
              console.log(error);
            }
          );
      },
      (error) => {
        console.log(error);
      }
    );
    this._phongService
      .getInfoRoomToBook(this.idloaiphong)
      .subscribe((result) => {
        this.selectedloaiphong = result;
        this.infoRoom = result;
      });
    this.bookingInfo.getClientInfo().subscribe(
      (result) => {
        this.infoClient = result;
      },
      (error) => {
        console.log(error);
      }
    );
    this.bookingInfo.getSearchBookingInfo().subscribe(
      (result) => {
        this.infoBooking = result;
        this.infoBooking.ngayDat = moment(this.infoBooking.ngayDat); // Chuyển sang đối tượng moment.Moment
        this.infoBooking.ngayTra = moment(this.infoBooking.ngayTra); // Chuyển sang đối tượng moment.Moment
        console.log("lay dl2", this.infoBooking);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateNumberOfNights(start: moment.Moment, end: moment.Moment): number {
    if (start && end) {
      const duration = moment.duration(end.diff(start));
      return duration.asDays();
    }
    return 0; // Hoặc giá trị mặc định tương ứng
  }

  addClientBookRoom() {
    this.confirmBook.hoTen = this.infoClient.hoTen;
    this.confirmBook.cccd = this.infoClient.cccd;
    this.confirmBook.sdt = this.infoClient.sdt;
    this.confirmBook.email = this.infoClient.email;
    this.confirmBook.datHo = this.infoClient.datHo;
    this.confirmBook.yeuCauDacBiet = this.infoClient.yeuCauDacBiet;

    this.confirmBook.ngayDat = this.infoBooking.ngayDat;
    this.confirmBook.ngayTra = this.infoBooking.ngayTra;

    this.confirmBook.slNguoiLon = this.infoBooking.slNguoiLon;
    this.confirmBook.slTreEm = this.infoBooking.slTreEm;
    this.confirmBook.slNguoiLon = this.infoBooking.slNguoiLon;
    this.confirmBook.slPhong = this.infoBooking.slPhong;
    this.confirmBook.tongTien =
      (this.infoRoom.giaPhongTheoDem + this.infoRoom.giaDichVuThem) *
      (1 - this.infoRoom.giamGia - this.infoRoom.uuDaiDacBiet);
    this.confirmBook.phongId = this.infoRoom.phongId;

    this._phongService.confirmBookRoom(this.confirmBook).subscribe(
      (result) => {
        console.log(result);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Đặt thành công",
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Đặt không thành công vui lòng kiểm tra lại",
        });
      }
    );
  }

  showMessage() {}
}
