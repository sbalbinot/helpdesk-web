import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../../models/response-api';
import { Ticket } from '../../../models/ticket.model';
import { SharedService } from '../../../services/shared.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'hd-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  ticket = new Ticket('',0,'','','','',null,null,'',null);
  shared : SharedService;
  message : {};
  classCss : {};

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    this.ticketService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.ticket = responseApi.data;
      this.ticket.date = new Date(this.ticket.date).toISOString();
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
    this.message = {};
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi:ResponseApi) => {
        this.ticket = new Ticket('',0,'','','','',null,null,'',null);
        let ticket : Ticket = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${ticket.title} successfully!`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  onFileChange(event): void{
    if(event.target.files[0].size > 2000000){
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 2MB'
      });
    } else {
      this.ticket.image = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
          this.ticket.image = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  changeStatus(status:string): void{
    this.ticketService.changeStatus(status,this.ticket).subscribe((response:ResponseApi) => {
        this.ticket = response.data;
        this.ticket.date = new Date(this.ticket.date).toISOString();
        this.showMessage({
          type: 'success',
          text: 'Successfully changed status!'
        });
    } , error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
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
