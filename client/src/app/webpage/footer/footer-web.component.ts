import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-footer-web',
  templateUrl: './footer-web.component.html',
  styleUrls: ['./footer-web.component.scss']
})
export class FooterWebComponent implements OnInit {

  public anio = moment(moment().toDate()).year();

  ngOnInit(): void {

  }
}
