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

@Component({
  selector: "app-formtaokhachsan",
  templateUrl: "./formtaokhachsan.component.html",
  styleUrls: ["./formtaokhachsan.component.css"],
})
export class FormtaokhachsanComponent {
  FormTaoKhachSan: FormGroup;
  FormTaoLoaiPhong: FormGroup;
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
  loaiHinhCuTruOptions: any[] = [
    { name: "Khách Sạn", key: 1 },
    { name: "Khách Sạn Cao Cấp", key: 2 },
    { name: "HomeStay", key: 3 },
    { name: "Nhà Nghỉ", key: 4 },
    { name: "Resort", key: 5 },
    { name: "Căn Hộ", key: 6 },
    { name: "Chỗ nghỉ", key: 7 },
    { name: "Nhà dân", key: 8 },
    { name: "Nhà Trọ", key: 9 },
    { name: "Biệt thự", key: 10 },
    { name: "Studio", key: 11 },
  ];
  //Số sao
  hangsaos: any[] = [
    { name: "1", key: 1 },
    { name: "2", key: 2 },
    { name: "3", key: 3 },
    { name: "4", key: 4 },
    { name: "5", key: 5 },
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
      locationdetail: ["", Validators.required],
      selectedLoaiHinh: this.hangsaos[4],
      selectedSao: this.hangsaos[4],
    });
    this.FormTaoLoaiPhong = this.fb.group({
      namephong: ["", Validators.required],
      tienNghiTrongPhong: ["", Validators.required],

      moTa: ["", Validators.required],
      sucChua: [2, Validators.required],
      giaPhongTheoDem: [0, Validators.required],
      giaGoiDichVuThem: [0, Validators.required],
      uuDai: [0, Validators.required],
    });
  }
  onSubmit() {}

  //chọn ảnh phòng
  // loadImage(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     this.imageUrl = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // }

  // chọn ảnh khách sạn

  imageKhachSanUrls: (string | ArrayBuffer | null)[] = [];

  onFilesKhachSanSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.loadImagesKhachSan(files);
    }
  }

  loadImagesKhachSan(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageKhachSanUrls.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  onDeleteKhachSanImage(imageUrl: string) {
    // Find the index of the image in the array
    const index = this.imageKhachSanUrls.indexOf(imageUrl);
    if (index !== -1) {
      // Remove the image URL from the array
      this.imageKhachSanUrls.splice(index, 1);
    }
  }

  // chọn ảnh phong
  imagePhongUrls: (string | ArrayBuffer | null)[] = [];

  onFilesPhongSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.loadImagesPhong(files);
    }
  }

  loadImagesPhong(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePhongUrls.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  onDeletePhongImage(imageUrl: string) {
    // Find the index of the image in the array
    const index = this.imagePhongUrls.indexOf(imageUrl);
    if (index !== -1) {
      // Remove the image URL from the array
      this.imagePhongUrls.splice(index, 1);
    }
  }
}
