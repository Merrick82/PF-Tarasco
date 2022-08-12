import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/interfaces/student';
import { studentList } from '../../utils/buildData';
import { AddStudentComponent } from '../add-student/add-student.component';
import { EditStudentComponent } from '../edit-student/edit-student.component';

const ELEMENT_DATA: Student[] = studentList;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public columns: string[] = ['nombre', 'promedio', 'cursando', 'acciones'];
  public datasource: MatTableDataSource<Student> = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatTable) table!: MatTable<Student>;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public deleteStudent(student: Student) {
    this.datasource.data = this.datasource.data.filter(( std ) => std.id != student.id);
  }

  public editStudent(student: Student) {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '500px',
      height: '350px',
      data: student
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const std = this.datasource.data.find(student => student.id === res.id);

        const index = this.datasource.data.indexOf(std!);
        this.datasource.data[index] = res;
        this.table.renderRows();
      }
    });
  }

  public addStudent() {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '500px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.datasource.data.push(res);
        this.table.renderRows();
      }
    });
  }
}
