import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../../models/response-api';
import { Ticket } from '../../../models/ticket.model';
import { SharedService } from '../../../services/shared.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'hd-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {

  @ViewChild('form')
  form: NgForm

  shared: SharedService
  
  ticket: Ticket = new Ticket('', 0, '', '', '', '', null, null, '', null)

  message: {}

  classCss: {}

  constructor(private route: ActivatedRoute, private ticketService: TicketService ) {
    this.shared = SharedService.getInstance()
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id']
    if (id != undefined) {
      this.findById(id)
    }
  }

  findById(id: string) {
    this.ticketService.findById(id).subscribe((response: ResponseApi) => {
      this.ticket = response.data
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      })
    })
  }

  register() {
    this.message = {}
    this.ticketService.createOrUpdate(this.ticket).subscribe((response: ResponseApi) => {
      this.ticket = new Ticket('', 0, '', '', '', '', null, null, '', null)
      let ticketRet: Ticket = response.data
      this.form.resetForm()
      this.showMessage({
        type: 'success',
        text: `Registered ${ticketRet.title} successfully!`
      })
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      })
    })
  }

  onFileChange($event: any): void {
    if ($event.target.files[0].size > 20000000) {
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 2MB'
      })
    } else {
      this.ticket.image = ''
      let reader = new FileReader()
      reader.onloadend = ( e: Event ) => {
        this.ticket.image = reader.result
      }
      reader.readAsDataURL($event.target.files[0])
    }
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

  getFromGroupClass(isInvalid: boolean, isDirty: boolean) {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    }
  }

}
