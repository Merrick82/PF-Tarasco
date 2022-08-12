import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
        name: new FormControl(data.name),
        lastname: new FormControl(data.lastname),
        email: new FormControl(data.email),
        average: new FormControl(data.average),
        active: new FormControl(data.active)
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
