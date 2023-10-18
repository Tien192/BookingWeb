import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {
  DiaDiemFullDto,
  DiaDiemServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { AngularFireStorage } from "@angular/fire/compat/storage";

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
    private _diadiemService: DiaDiemServiceProxy,

    private fireStorage: AngularFireStorage
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

  selectedFiles: File[] = [];
  imagePreviews: (string | ArrayBuffer | null)[] = [];

  // Function to handle file selection
  onSelectFiles(event: any) {
    this.selectedFiles = event.target.files;
    // Clear any existing image previews
    this.imagePreviews = [];

    // Load image previews for selected files
    for (const file of this.selectedFiles) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  // Function to remove an image preview
  removeImage(index: number) {
    // Remove the image preview and corresponding file from the arrays
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }
  // Function to handle the upload button click
  async onUploadClick() {
    // Check if any files were selected
    if (this.selectedFiles.length === 0) {
      return;
    }

    // Add a confirmation dialog here if needed
    const confirmUpload = confirm("Bạn có chắc muốn thêm những ảnh này?");

    if (confirmUpload) {
      // Loop through the selected files and upload them
      for (const file of this.selectedFiles) {
        const path = `AnhKhachSan/${file.name}`;
        try {
          // Use await within the async function
          const uploadTask = await this.fireStorage.upload(path, file);
          const url = await uploadTask.ref.getDownloadURL();
          console.log(`Thành công thêm ảnh: ${file.name}, URL: ${url}`);
        } catch (error) {
          console.error(`Có lỗi khi tải ${file.name}: ${error.message}`);
        }
      }

      // Clear the selected files array after uploading
      this.selectedFiles = [];
    }
  }

  // chọn ảnh phong
  imagePhongUrls: (string | ArrayBuffer | null)[] = [];

  onFilesPhongSelected(event: any) {}

  loadImagesPhong(files: FileList) {}

  onDeletePhongImage(imageUrl: string) {}
}
