import { Component } from "@angular/core";

@Component({
  selector: "app-floatingbutton",
  templateUrl: "./floatingbutton.component.html",
  styleUrls: ["./floatingbutton.component.css"],
})
export class FloatingbuttonComponent {
  UuDai = false;
  HoTroKhachHang = false;
  showUuDai() {
    this.UuDai = true;
  }
  showHoTroKhachHang() {
    this.HoTroKhachHang = true;
  }
}
