import { Component, OnInit } from '@angular/core';
import { DataService } from '../../common/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { io } from 'socket.io-client';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  columns: string[] = ['bienSoXe', 'vao', 'ra', 'tongThoiGianGui', 'tongTien', 'thoiGianThanhToan'];
  dataSource;

  socket: any;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getListDataPayment().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
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
    this.socket.on('payment', data => {
      this.dataSource = new MatTableDataSource([
        data,
        ...this.dataSource.filteredData,
      ]);
    });
  }


}
