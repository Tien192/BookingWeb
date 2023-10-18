import { Component, ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-dieukhoan",
  templateUrl: "./dieukhoan.component.html",
  styleUrls: ["./dieukhoan.component.css"],
})
export class DieukhoanComponent implements AfterViewInit {
  showMenu: boolean = true;
  showDieuKhoan: boolean = false;
  showChínhach: boolean = false;
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const menu = this.elementRef.nativeElement.querySelector("#menu");
    const menuItems = Array.from(
      this.elementRef.nativeElement.getElementsByClassName("menu-item")
    ) as HTMLElement[];

    menuItems.forEach((item, index) => {
      item.onmouseover = () => {
        menu.dataset.activeIndex = index.toString();
      };
    });
  }

  scrollToDieuKhoan() {
    const targetDieuKhoan = document.getElementById("DieuKhoan");
    if (targetDieuKhoan) {
      targetDieuKhoan.scrollIntoView({ behavior: "smooth" });
    }
  }
  scrollToChinhSach() {
    const targetChinhSach = document.getElementById("ChinhSach");
    if (targetChinhSach) {
      targetChinhSach.scrollIntoView({ behavior: "smooth" });
    }
  }
}
