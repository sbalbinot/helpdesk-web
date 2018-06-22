import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket.model';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) { }

  createOrUpdate(ticket: Ticket) {
    if (ticket.id !== null && ticket.id !== '') {
      return this.http.put(`${environment.api}/ticket`, ticket);
    } else {
      ticket.id = null;
      ticket.status = 'New';
      return this.http.post(`${environment.api}/ticket`, ticket);
    }
  }

  delete(id: string) {
    return this.http.delete(`${environment.api}/ticket/${id}`);
  }

  findById(id: string) {
    return this.http.get(`${environment.api}/ticket/${id}`);
  }

  findAll(page: number, count: number) {
    return this.http.get(`${environment.api}/ticket/${page}/${count}`);
  }

  findByParameters(page: number, count: number, assigned: boolean, ticket: Ticket) {
    ticket.number = ticket.number == null ? 0 : ticket.number;
    ticket.title = ticket.title == '' ? 'uninformed' : ticket.title;
    ticket.status = ticket.status == '' ? 'uninformed' : ticket.status;
    ticket.priority = ticket.priority == '' ? 'uninformed' : ticket.priority;
    return this.http.get(`${environment.api}/ticket/${page}/${count}/${ticket.number}/${ticket.title}/${ticket.status}/${ticket.priority}/${assigned}`);
  }

  changeStatus(status: string, ticket: Ticket) {
    return this.http.put(`${environment.api}/ticket/${ticket.id}/${status}`, ticket);
  }

  summary() {
    return this.http.get(`${environment.api}/ticket/summary`);
  }
}
