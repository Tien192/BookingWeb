import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import {
  HinhAnhServiceProxy,
  PhongServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-khachsan-detail",
  templateUrl: "./khachsan-detail.component.html",
  styleUrls: ["./khachsan-detail.component.css"],
})
export class KhachsanDetailComponent {
  selectedkhachsan: any;
  listhinhanh = [];
  listloaiphongtrong = [];
  listdichvuphongtrong = [];

  currentIndex = 0;
  id: number;
  value: string;
  constructor(
    private route: ActivatedRoute,

    private _phongService: PhongServiceProxy,
    private _hinhanhService: HinhAnhServiceProxy // private _donvikinhdoanhService: DonViKinhDoanhServiceProxy
  ) {}
  ngOnInit() {
    //Gán id trên router cho biến id
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
    });

    this._phongService.getRoomById(this.id).subscribe((result) => {
      this.selectedkhachsan = result;
    });

    this._hinhanhService.getImageByRoom(this.id).subscribe((result) => {
      this.listhinhanh = result.map((item) => ({
        tenFileAnh: item?.tenFileAnh,
      }));
    });
  }
  splitChiTietIntoArray(chiTiet: string): string[] {
    return chiTiet.split("\n");
  }
  getCurrentSlideUrl(): string {
    return `url('/assets/img/DonViKinhDoanh/${this?.selectedkhachsan?.tenFileAnhDaiDien}')`;
  }
  getCurrentSubSlideUrl(index: number): string {
    return `url('/assets/img/HinhAnh/${this?.listhinhanh[index]?.tenFileAnh}')`;
  }
}
