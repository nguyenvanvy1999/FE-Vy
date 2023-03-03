import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NbSpinnerService } from '@nebular/theme';

@Component({
  selector: 'ngx-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.scss'],
})
export class QrPageComponent implements OnInit {
  public stringUrl: string;
  constructor(
    private route: ActivatedRoute,
    private spinner: NbSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.load();
    this.stringUrl = environment.domainURL + 'blank/' + this.route.snapshot.params.id;
  }

}
