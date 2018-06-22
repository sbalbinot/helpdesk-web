import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../models/response-api';
import { User } from '../../../models/user.model';
import { DialogService } from '../../../services/dialog.service';
import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'hd-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  shared: SharedService

  page: number = 0
  count: number = 5
  pages: Array<number>

  message: {}
  classCss: {}

  users: Array<User> = []


  constructor( 
    private route: Router,
    private dialogService: DialogService,
    private userService: UserService ) {
      this.shared = SharedService.getInstance()
     }

  ngOnInit() {
    this.findAll(this.page, this.count)
  }

  findAll(page: number, count: number) {
    this.userService.findAll(page, count).subscribe((response: ResponseApi) => {
      this.users = response['data']['content']
      this.pages = new Array(response['data']['totalPages'])
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      })
    })
  }

  edit(id: string) {
    this.route.navigate(['/user-new', id])
  }

  delete(id: string) {
    this.dialogService.confirm(' Do you want to delete the user? ')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.message = {}
          this.userService.delete(id).subscribe((response: ResponseApi) => {
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
