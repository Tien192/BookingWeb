import { Component } from "@angular/core";

@Component({
  selector: "app-floatingbutton",
  templateUrl: "./floatingbutton.component.html",
  styleUrls: ["./floatingbutton.component.css"],
})
export class FloatingbuttonComponent {
  UuDai = true;
  HoTroKhachHang = false;
  showUuDai() {
    this.UuDai = !this.UuDai;
  }
  showHoTroKhachHang() {
    this.HoTroKhachHang = !this.HoTroKhachHang;
  }
}
