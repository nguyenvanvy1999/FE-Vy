import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';

@Component({
  selector: 'ngx-payment-done',
  templateUrl: './payment-done.component.html',
  styleUrls: ['./payment-done.component.scss'],
})
export class PaymentDoneComponent implements OnInit {

  constructor(
    private spinner: NbSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.load();
  }

}
