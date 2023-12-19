import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pipeLine';
  list: any = [];
  display: boolean = false;
  formData!: UntypedFormGroup;
  public form:FormGroup;
  constructor(private appService: AppService,private _fb: UntypedFormBuilder,fb:FormBuilder) {
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
    console.log(this.form)
  }
}
