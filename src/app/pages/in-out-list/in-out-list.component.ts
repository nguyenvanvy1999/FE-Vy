import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../common/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';

export interface PeriodicElement {
  id: number;
  bienSoXe: string;
  vao: Date;
  ra?: Date;
  tongThoiGianGui?: number;
  tongTien?: string;
  mediaLink: string;
  thoiGianThanhToan?: Date;
}

@Component({
  selector: 'ngx-in-out-list',
  templateUrl: './in-out-list.component.html',
  styleUrls: ['./in-out-list.component.scss'],
})


export class InOutListComponent implements OnInit {
  columns: string[] = ['STT', 'bienSoXe', 'vao', 'ra', 'tongThoiGianGui'];
  dataSource;

  filterForm: FormGroup;

  socket: any;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      search: new FormControl(''),
      status: new FormControl(''),
      dateType: new FormControl('in'),
      timeStart: new FormControl(null),
      timeEnd: new FormControl(null),
      },
    );
    this.dataService.getListData().subscribe(res => {
      this.dataSource = new MatTableDataSource(res.map((el, index) => {
        return {
          ...el,
          position: index + 1,
        };
      }));
    });

    this.filterForm.valueChanges.subscribe(filter => {
      this.dataService.getListData(
        filter.search,
        filter.status,
        filter.dateType,
        filter.timeStart ? new Date(filter.timeStart).toISOString() : '',
        filter.timeEnd ? new Date(filter.timeEnd).toISOString() : '',
      ).subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
      });
    });
    this.handleSocket();

  }

  handleSocket() {
    const idToken = localStorage.getItem('idToken');
    this.socket = io(`${environment.socketURL}?token=${idToken}`, {
      auth: {
        query: idToken,
      },
      transports: ['websocket'],
      upgrade: false,
    }).connect();
    this.socket.on('data.in', data => {
      this.dataSource = new MatTableDataSource([
        data,
        ...this.dataSource.filteredData,
      ]);
    });
    this.socket.on('data.out', data => {
      if (data && data._id) {
        const index = this.dataSource.filteredData.findIndex(el => el._id === data._id);
        if (index > -1) {
          this.dataSource.filteredData[index] = data;
          this.dataSource = new MatTableDataSource([
            ...this.dataSource.filteredData,
          ]);
        }
      }
    });
  }
  viewDetail(item) {
    this.router.navigate(['./pages/in-out-list/' + item._id]);
  }

}
