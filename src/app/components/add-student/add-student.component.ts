import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/interfaces/student';
import { studentList } from '../../utils/buildData';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public form!: FormGroup;
  public students: Student[] = [];

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddStudentComponent>) {
    this.students = studentList;

    console.log('AddStudentComponent', this.students.length + 1);
    
    this.form = fb.group({
      id: this.students.length + 1,
      name: ['', [Validators.required, Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      average: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      active: ['', Validators.required]
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

  /*public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }*/
}
