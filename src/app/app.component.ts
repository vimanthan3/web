import { Component } from '@angular/core';
import { AppService } from './app.service';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class AppComponent {
  title = 'pipeLine';
  list: any = [];
  display: boolean = false;
  formData!: UntypedFormGroup;
  currencyCode: any = 'INR';
  amount: any[] = ['INR', 'USD', 'SGD'];
  // form: UntypedFormGroup | undefined;
  form!: UntypedFormGroup;
  param: any = {
    name: '',
    amount: 0,
    dueDt: new Date(),
    currencyCode: '',
    id:0
  };
  constructor(
    private appService: AppService,
    private _fb: UntypedFormBuilder,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.get();
    this.createForm(this.param);
  }

  get() {
    this.appService.get().subscribe((data: any) => {
      let { content } = data;
      this.list = content;
    });
  }
  submitForm() {
    if (!this.form?.valid) {
      this.showError();
      return;
    }
    this.appService.post(this.form.value).subscribe((data: any) => {
      console.log(this.form.value.id)
      this.showSuccess(this.form.value.id);
      this.get();
      this.display = false;
    });
  }
  showSuccess(id:any) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Invoice ${id>0?'updated':'added'} successfully`,
    });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error occurred',
    });
  }
  confirm(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.appService.delete(id).subscribe((data: any) => {
          this.get();
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Record deleted',
          });
        });
      },
      reject: () => {

      },
    });
  }
  onCurrencyCodeChange(selectedValue: any) {
    this.currencyCode = selectedValue;
  }
  createForm(param:any){
    this.form = this.fb.group({
      name: [param.name, Validators.required],
      amount: [param.amount, Validators.required],
      dueDt: [new Date(param.dueDt), Validators.required],
      currencyCode: [param.currencyCode],
      createdDt: new Date(),
      id:param.id,
    });
  }
}
