import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../models/response-api';
import { Ticket } from '../../../models/ticket.model';
import { DialogService } from '../../../services/dialog.service';
import { SharedService } from '../../../services/shared.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'hd-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  shared: SharedService

  page: number = 0
  count: number = 5
  pages: Array<number>

  message: {}
  classCss: {}
  
  tickets: Array<Ticket> = []

  assigned: boolean = false  
  filter: Ticket = new Ticket('', null, '', '', '', '', null, null, '', null)

  constructor( 
    private route: Router,
    private dialogService: DialogService,
    private ticketService: TicketService ) {
      this.shared = SharedService.getInstance()
    }

  ngOnInit() {
    this.findAll(this.page, this.count)
  }

  findAll(page: number, count: number) {
    this.ticketService.findAll(page, count).subscribe((response: ResponseApi) => {
      this.tickets = response['data']['content']
      this.pages = new Array(response['data']['totalPages'])
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      })
    })
  }

  edit(id: string) {
    this.route.navigate(['/ticket-new', id])
  }

  detail(id: string) {
    this.route.navigate(['/ticket-detail', id])
  }

  delete(id: string) {
    this.dialogService.confirm(' Do you want to delete the ticket? ')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.message = {}
          this.ticketService.delete(id).subscribe((response: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: 'Record deleted!'
            })
            this.findAll(this.page, this.count)
          }, error => {
            this.showMessage({
              type: 'error',
              text: error['error']['errors'][0]
            })
          })
        }
      })
  }

  doFilter(): void {
    this.page = 0
    this.count = 5
    this.ticketService.findByParameters(this.page, this.count, this.assigned, this.filter)
      .subscribe((response: ResponseApi) => {
        this.filter.title = this.filter.title == 'uninformed' ? '' : this.filter.title
        this.filter.number = this.filter.number == 0 ? null : this.filter.number
        this.tickets = response['data']['content']
        this.pages = new Array(response['data']['totalPages'])
      }, error => {
        this.showMessage({
          type: 'error',
          text: error['error']['errors'][0]
        })
      })
  }

  cleanFilter(): void {
    this.assigned = false
    this.page = 0
    this.count = 5
    this.filter = new Ticket('', null, '', '', '', '', null, null, '', null)
    this.findAll(this.page, this.count)
  }

  nextPage(event: any) {
    event.preventDefault() // evita reload na tela
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1
      this.findAll(this.page, this.count)
    }
  }
  
  previousPage(event: any) {
    event.preventDefault() // evita reload na tela
    if (this.page > 0) {
      this.page = this.page - 1
      this.findAll(this.page, this.count)
    }
  }

  setPage(i: number, event: any) {
    event.preventDefault() // evit reload na tela
    this.page = i
    this.findAll(this.page, this.count)
  }

  showMessage(message: {type: string, text: string}): void {
    this.message = message
    this.buildClasses(message.type)
    setTimeout(() => {
      this.message = undefined
    }, 3000)
  }

  buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true
  }


}
