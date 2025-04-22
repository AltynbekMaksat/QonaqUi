import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: "app-support",
  templateUrl: "./support.component.html",
  styleUrls: ["./support.component.scss"],
})
export class SupportComponent implements OnInit {
  supportForm!: FormGroup;
  isSubmitting = false;

  faqs: FAQ[] = [
    {
      question: "Как забронировать номер?",
      answer:
        'Для бронирования номера выберите отель, даты проживания и количество гостей. Затем выберите подходящий номер и нажмите кнопку "Забронировать". Заполните форму бронирования и подтвердите заказ.',
      isOpen: false,
    },
    {
      question: "Как отменить бронирование?",
      answer:
        'Вы можете отменить бронирование в своем личном кабинете в разделе "Мои бронирования". Выберите бронирование, которое хотите отменить, и нажмите кнопку "Отменить". Обратите внимание на условия отмены, которые могут различаться в зависимости от отеля.',
      isOpen: false,
    },
    {
      question: "Когда происходит оплата?",
      answer:
        "В зависимости от условий бронирования, оплата может быть произведена сразу при бронировании или при заселении в отель. Информация о способе оплаты указана на странице бронирования.",
      isOpen: false,
    },
    {
      question: "Можно ли изменить даты бронирования?",
      answer:
        'Да, вы можете изменить даты бронирования в своем личном кабинете, если это позволяют условия бронирования. Выберите бронирование, которое хотите изменить, и нажмите кнопку "Изменить".',
      isOpen: false,
    },
    {
      question: "Как получить подтверждение бронирования?",
      answer:
        'После успешного бронирования вы получите подтверждение на указанный email. Также вы можете найти информацию о бронировании в своем личном кабинете в разделе "Мои бронирования".',
      isOpen: false,
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.supportForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      message: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.supportForm.controls;
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  submitForm(): void {
    if (this.supportForm.invalid) {
      this.supportForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // Имитация отправки формы
    setTimeout(() => {
      console.log("Form submitted:", this.supportForm.value);
      this.isSubmitting = false;
      this.supportForm.reset();
      alert(
        "Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время."
      );
    }, 1500);
  }
}
