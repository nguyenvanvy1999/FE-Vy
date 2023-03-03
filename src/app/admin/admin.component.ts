import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';
import { DoorService } from '../common/services/door.service';
import { combineLatest, forkJoin } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  doorStatus = {
    inOpen: false,
    outOpen: false,
  };
  socket: any;

  dataIn: any;
  dataOut: any;
  constructor(
    private spinner: NbSpinnerService,
    private doorService: DoorService,
  ) { }

  ngOnInit(): void {
    this.spinner.load();
    forkJoin(
      this.doorService.doorStatus('in'),
      this.doorService.doorStatus('out'),
    ).subscribe(res => {
      if (res && res[0] && res[1]) {
        this.doorStatus.inOpen = res[0].status === 'O';
        this.doorStatus.outOpen = res[1].status === 'O';
      }
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
      console.log(data)
      this.dataIn = data;
    });
    this.socket.on('data.out', data => {
      console.log(data)
      this.dataOut = data;
    });
  }


  changeDoorStatus(type: string, status: boolean) {
    switch (type) {
      case 'IN':
        this.doorService.controlDoor(type.toLowerCase(), status ? 'O' : 'C').subscribe();
        this.doorStatus.inOpen = !this.doorStatus.inOpen;
        break;
      case 'OUT':
        this.doorService.controlDoor(type.toLowerCase(), status ? 'O' : 'C').subscribe();
        this.doorStatus.outOpen = !this.doorStatus.outOpen;
        break;
      default:
        break;
    }
  }

}
