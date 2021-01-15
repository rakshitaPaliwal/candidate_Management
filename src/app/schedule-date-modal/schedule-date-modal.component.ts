import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-date-modal',
  templateUrl: './schedule-date-modal.component.html',
  styleUrls: ['./schedule-date-modal.component.css']
})
export class ScheduleDateModalComponent implements OnInit {

  scheduleForm: FormGroup;
  todayDate:any = new Date();

  constructor(
    public matDialogRef: MatDialogRef<ScheduleDateModalComponent>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.scheduleForm = this._formBuilder.group({
      scheduleDateTime: ["", [Validators.required]],
    });
  }

  updateDateTime() {
    if(this.scheduleForm.value.scheduleDateTime == '') return;
    this.matDialogRef.close(this.scheduleForm.value.scheduleDateTime);
  }

}
