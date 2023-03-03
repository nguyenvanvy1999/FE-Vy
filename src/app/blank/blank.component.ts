import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
})
export class BlankComponent implements OnInit {
  socket: any;

  constructor(
    private spinner: NbSpinnerService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.spinner.load();
    const idToken = localStorage.getItem('idToken');
    this.socket = io(`${environment.socketURL}?token=${idToken}`, {
      auth: {
        query: idToken,
      },
      transports: ['websocket'],
      upgrade: false,
    }).connect();
    this.socket.on('data.out', data => {
      if (data && data._id) {
        this.goToQr(data._id);
      }
    });
  }

  goToQr(id: string) {
    this.router.navigate(['blank/qr/' + id]);
  }


}
