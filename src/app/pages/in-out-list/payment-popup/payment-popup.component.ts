import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.scss'],
})
export class PaymentPopupComponent implements OnInit {
  @Input() title: string;

  public step = 1;

  constructor(
    protected ref: NbDialogRef<PaymentPopupComponent>,
  ) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.ref.close();
  }

}
