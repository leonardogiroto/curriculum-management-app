import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Formation } from '../../../../models/formation';

@Component({
  selector: 'app-new-formation-dialog',
  templateUrl: 'formation-dialog.html',
  styleUrls: ['./formation-dialog.scss']
})
export class NewFormationDialog implements OnInit {

  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewFormationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'institution': new FormControl('', [ Validators.required ]),
      'course': new FormControl('', [ Validators.required ]),
      'concluded': new FormControl(false, [ Validators.required ]),
      'start_date': new FormControl('', [ Validators.required ]),
      'end_date': new FormControl('')
    });
  }

  public dismiss(): void {
    this.dialogRef.close();
  }

  public addFormation(): void {
    const formation: Formation = this.formGroup.getRawValue();
    this.dialogRef.close(formation);
  }

}
