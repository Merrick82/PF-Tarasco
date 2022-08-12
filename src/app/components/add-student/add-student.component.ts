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
      lastname: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      average: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      active: ''
    });
  }

  ngOnInit(): void {
  }

  public close() {
    this.dialogRef.close();
  }

  public save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  }
}
