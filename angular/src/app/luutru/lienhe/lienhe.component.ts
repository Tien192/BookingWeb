import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  LienHeServiceProxy,
  MessageDto,
} from "@shared/service-proxies/service-proxies";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-lienhe",
  templateUrl: "./lienhe.component.html",
  styleUrls: ["./lienhe.component.css"],
})
export class LienheComponent implements OnInit {
  contactForm: FormGroup;
  lienHeDto: MessageDto;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private _lienhe: LienHeServiceProxy
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.lienHeDto = new MessageDto(); // Initialize the object here

    const faqBoxes = document.querySelectorAll(".contact .row .faq .box h3");

    faqBoxes.forEach((faqBox: HTMLElement) => {
      faqBox.addEventListener("click", () => {
        faqBox.parentElement?.classList.toggle("active");
      });
    });
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      number: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      message: ["", [Validators.required, Validators.maxLength(1000)]],
    });
  }
  showGui() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Gửi thành công",
    });
  }
  onSubmit(): void {
    this.lienHeDto = new MessageDto(); // Initialize the object here

    this.lienHeDto.hoten = this.contactForm.value?.name;
    this.lienHeDto.email = this.contactForm.value?.email;
    this.lienHeDto.phoneNumber = this.contactForm.value?.number;
    this.lienHeDto.noiDung = this.contactForm.value?.message;

    this._lienhe.clientSendToMessage(this.lienHeDto).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log("loi lien he:", error);
      }
    );
  }
}
