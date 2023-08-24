import { Component } from "@angular/core";

@Component({
  selector: "app-hotrokhachhang",
  templateUrl: "./hotrokhachhang.component.html",
  styleUrls: ["./hotrokhachhang.component.css"],
})
export class HotrokhachhangComponent {
  showSupport: boolean = true;
  closeSupport() {
    this.showSupport = false;
  }
}
