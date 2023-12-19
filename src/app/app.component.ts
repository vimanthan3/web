import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'pipeLine';
  list: any = [];
  display: boolean = false;
  formData!: UntypedFormGroup;
  public form:FormGroup;
  constructor(private appService: AppService,private _fb: UntypedFormBuilder,fb:FormBuilder,private messageService: MessageService) {
    this.form = fb.group({
      name: ["",Validators.required],
      amount: ["",Validators.required],
      dueDt: ["",Validators.required],
    })
  }

  ngOnInit() {
    this.get();
    this.createForm();
  }

  get() {
    this.appService.get().subscribe((data: any) => {
      this.list=data;
      console.log(data);
    });
  }
  createForm() {
    this.showSuccess()
    console.log(this.form)
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invoice added successfully' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occurred' });
  }
}
