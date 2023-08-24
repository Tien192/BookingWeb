import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  DiaDiemFullDto,
  DiaDiemServiceProxy,
} from "@shared/service-proxies/service-proxies";

interface LocItem {
  label: string;
  value: number;
}
@Component({
  selector: "app-formtaokhachsan",
  templateUrl: "./formtaokhachsan.component.html",
  styleUrls: ["./formtaokhachsan.component.css"],
})
export class FormtaokhachsanComponent {
  FormTaoKhachSan: FormGroup;
  suggestionsDiaDiem: DiaDiemFullDto[];

  selectedLoaiHinhCuTru: number[] = [];
  constructor(
    private fb: FormBuilder,
    private _diadiemService: DiaDiemServiceProxy
  ) {}

  // Chon dia diem
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
  // End chon dia diem

  // Chon loai hinh cu tru
  loaiHinhCuTruOptions: LocItem[] = [
    { label: "Khách Sạn", value: 1 },
    { label: "Khách Sạn Cao Cấp", value: 2 },
    { label: "HomeStay", value: 3 },
    { label: "Nhà Nghỉ", value: 4 },
    { label: "Resort", value: 5 },
    { label: "Căn Hộ", value: 6 },
    { label: "Chỗ nghỉ", value: 7 },
    { label: "Nhà dân", value: 8 },
    { label: "Nhà Trọ", value: 9 },
    { label: "Biệt thự", value: 10 },
    { label: "Studio", value: 11 },
  ];

  onCheckboxLoaiHinhChange(value: number) {
    const locLoaiHinhCuTru = this.FormTaoKhachSan.get(
      "LocLoaiHinhCuTru"
    ) as FormGroup;
    const control = locLoaiHinhCuTru.get(value.toString());

    if (control) {
      if (control.value) {
        this.selectedLoaiHinhCuTru.push(value);
      } else {
        const index = this.selectedLoaiHinhCuTru.indexOf(value);
        if (index !== -1) {
          this.selectedLoaiHinhCuTru.splice(index, 1);
        }
      }
    }
  }
  //End chon loai hinh cu tru
  ngOnInit() {
    this.FormTaoKhachSan = this.fb.group({
      locations: [null, Validators.required],
      LocLoaiHinhCuTru: this.fb.group({}),
      name: ["", Validators.required],
    });
    const locLoaiHinhCuTru = this.FormTaoKhachSan.get(
      "LocLoaiHinhCuTru"
    ) as FormGroup;
    this.loaiHinhCuTruOptions.forEach((option) => {
      locLoaiHinhCuTru.addControl(
        option.value.toString(),
        new FormControl(false)
      );
    });
  }
  onSubmit() {}
}
