import { Component, OnInit } from '@angular/core';
import { ResponseApi } from '../../models/response-api';
import { Summary } from '../../models/summary.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'hd-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: Summary = new Summary()

  message : {};

  classCss : {};

  constructor(
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.ticketService.summary().subscribe((response: ResponseApi) => {
      this.summary = response.data
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    })
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] =  true;
  }

}
