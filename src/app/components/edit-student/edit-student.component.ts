import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/interfaces/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) { 
      this.form = fb.group({
        id: new FormControl(data.id),
        name: [data.name, [Validators.required, Validators.maxLength(25)]],
        lastname: [data.lastname, [Validators.required, Validators.maxLength(25)]],
        email: [data.email, [Validators.required, Validators.email]],
        average: [data.average, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        active: [data.active, Validators.required]
      });
    }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    this.dialogRef.close(this.form.value);
  }
}
