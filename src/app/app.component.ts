import { Component, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { ScheduleDateModalComponent } from './schedule-date-modal/schedule-date-modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  qualification: string;
  yearsOfExp: Number;
  date: Date;
  image: string;
  email: string;
  number: Number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Rakshita Paliwal', qualification: 'B.Tech.', yearsOfExp: 3, date: null, image: 'https://www.w3schools.com/howto/img_avatar.png', email: 'rakshita@gmail.com', number: 9874102563},
  {position: 2, name: 'Ankit Yadav', qualification: 'B.E.', yearsOfExp: 7, date: null,  image: 'https://cad.gov.jm/wp-content/uploads/2017/10/img_avatar2.png', email: 'ankit@gmail.com', number: 1234567890},
  {position: 3, name: 'Manoj Kumar', qualification: 'M.A.', yearsOfExp: 1, date: null,  image: 'https://browncord.co.ke/assets/imag/Users/vendorss/Browncord_Events.png', email: 'manoj@gmail.com', number: 8520147963},
  {position: 4, name: 'Ram Sharma', qualification: 'MCA', yearsOfExp: 5, date: null,  image: 'https://www.netclipart.com/pp/m/135-1353105_img-avatar-2-png-illustration.png', email: 'ram@gmail.com', number: 9874102365},
  {position: 5, name: 'Shayam Bansal', qualification: 'B.Tech.', yearsOfExp: 2, date: null,  image: 'https://www.pngitem.com/pimgs/m/111-1114839_circle-people-icon-flat-png-avatar-icon-transparent.png', email: 'shyam@gmail.com', number: 8123658974},
  {position: 6, name: 'Jatin Joshi', qualification: 'B.Sc.', yearsOfExp: 6, date: null,  image: 'https://developer.mozilla.org/static/img/favicon144.png', email: 'jatin@gmail.com', number: 9632014785},
  {position: 7, name: 'Rashmi Yadav', qualification: 'M.Com', yearsOfExp: 2, date: null,  image: 'https://www.w3schools.com/howto/img_avatar.png', email: 'rashmi@gmail.com', number: 9988441100}
];

const ELEMENT_DATA2: PeriodicElement[] = [
  {position: 8, name: 'Mukul Sen', qualification: 'MBA', yearsOfExp: 10, date: new Date('Mon Mar 15 2021 19:19:06 GMT+0530 (India Standard Time)'),  image: 'https://www.pngitem.com/pimgs/m/111-1114839_circle-people-icon-flat-png-avatar-icon-transparent.png', email: 'mukul@gmail.com', number: 9874100147},

  {position: 9, name: 'Deepak Kumar', qualification: 'BBA', yearsOfExp: 3, date: new Date('Wed Feb 17 2021 06:17:20 GMT+0530 (India Standard Time)'),  image: 'https://www.netclipart.com/pp/m/135-1353105_img-avatar-2-png-illustration.png', email: 'deepak@gmail.com', number: 6547893210},

  {position: 10, name: 'Akshay Agrawal', qualification: 'BCA', yearsOfExp: 5, date: new Date('Thu Jan 28 2021 09:15:25 GMT+0530 (India Standard Time)'),  image: 'https://developer.mozilla.org/static/img/favicon144.png', email: 'akshay@gmail.com', number: 9874102563}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Schedule and Manage Candidate Interview';

  constructor(
    public dialog: MatDialog
  ) {}

  @ViewChild('table') table: MatTable<PeriodicElement>;
  displayedColumns: string[] = ['position', 'name', 'qualification', 'yearsOfExp', 'date', 'info'];
  dataSource = ELEMENT_DATA;

  @ViewChild('table2') table2: MatTable<PeriodicElement>;
  displayedColumns2: string[] = ['position', 'name', 'qualification', 'yearsOfExp', 'date', 'info'];
  dataSource2 = ELEMENT_DATA2;

  @ViewChild(MatSort) sort: MatSort;
  isAscending = true;
  sortScheduledDate(arr) {
    if(this.isAscending){
      arr = arr.sort((a, b) => (a.date > b.date) ? 1 : -1);
    }else{
      arr = arr.sort((a, b) => (a.date > b.date) ? -1 : 1);
    }
    this.isAscending = !this.isAscending;
    this.table2.renderRows();
  }

  dropTable(event: CdkDragDrop<string[]>) {
    const prevIndex1 = this.dataSource.findIndex((d) => d === event.item.data);
    const prevIndex2 = this.dataSource2.findIndex((d) => d === event.item.data);
    if (event.previousContainer === event.container) {
      if(event.container.id == 'cdk-drop-list-0'){
        moveItemInArray(this.dataSource, prevIndex1, event.currentIndex);
        this.table.renderRows();
      } else if(event.container.id == 'cdk-drop-list-1'){
        moveItemInArray(this.dataSource2, prevIndex2, event.currentIndex);
        this.table2.renderRows();
      }
    } else {
      if(event.item.data.date == null) return;
      if(event.container.id == 'cdk-drop-list-1'){
        if(new Date(event.item.data.date) < new Date()) return;
        // In Case of from Table1 to Table2
        transferArrayItem(this.dataSource, this.dataSource2, prevIndex1, event.currentIndex);
        this.table.renderRows();
        this.table2.renderRows();
      } else if(event.container.id == 'cdk-drop-list-0'){
        // In Case of from Table2 to Table1
        transferArrayItem(this.dataSource2, this.dataSource, prevIndex2, event.currentIndex);
        this.table.renderRows();
        this.table2.renderRows();
      }

    }
  }

  scheduleDate(data) {
    this.dialog.open(ScheduleDateModalComponent,{
      panelClass: 'role-dialog'
    }).afterClosed().subscribe(
      (res)=>{
        if(res) {
          this.dataSource = this.removeValue(this.dataSource, data.position);
          data.date = res;
          this.dataSource2.push(data);
          this.table2.renderRows();
        }
      }
    );
  }

  removeValue = function(array, id) {
    return array.filter(function(o) { return o.position !== id; });
  };
}
