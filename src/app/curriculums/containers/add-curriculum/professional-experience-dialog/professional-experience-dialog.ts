import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfessionalExperience } from '../../../../models/professional-experience';

@Component({
  selector: 'app-new-prof-experience-dialog',
  templateUrl: 'professional-experience-dialog.html',
  styleUrls: ['./professional-experience-dialog.scss']
})
export class NewProfessionalExperienceDialog implements OnInit {

  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewProfessionalExperienceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'company_name': new FormControl('', [ Validators.required ]),
      'role': new FormControl('', [ Validators.required ]),
      'start_date': new FormControl('', [ Validators.required ]),
      'end_date': new FormControl('')
    });
  }

  public dismiss(): void {
    this.dialogRef.close();
  }

  public addFormation(): void {
    const formation: ProfessionalExperience = this.formGroup.getRawValue();
    this.dialogRef.close(formation);
  }

}
