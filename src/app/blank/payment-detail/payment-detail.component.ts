import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../common/services/data.service';
import { NbSpinnerService } from '@nebular/theme';

@Component({
  selector: 'ngx-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss'],
})
export class PaymentDetailComponent implements OnInit {
  private itemId: string;

  public item: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private spinner: NbSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.load();
    this.itemId = this.route.snapshot.params.id;
    this.dataService.getDetailData(this.itemId).subscribe(res => {
      this.item = res;
    });
  }

  payment() {
    this.dataService.postPayment(this.itemId).subscribe((res) => {
      res && this.router.navigate(['blank/result/success']);
    });
  }

}
