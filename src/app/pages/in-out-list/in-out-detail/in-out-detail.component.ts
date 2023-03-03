import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../in-out-list.component';
import { NbDialogService } from '@nebular/theme';
import { PaymentPopupComponent } from '../payment-popup/payment-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../common/services/data.service';

@Component({
  selector: 'ngx-in-out-detail',
  templateUrl: './in-out-detail.component.html',
  styleUrls: ['./in-out-detail.component.scss'],
})
export class InOutDetailComponent implements OnInit {
  private itemId: string;
  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }
  item;

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params.id;
    this.dataService.getDetailData(this.itemId).subscribe(res => {
      this.item = res;
    });
  }

  back() {
    this.router.navigate(['pages/in-out-list']);
  }

}
