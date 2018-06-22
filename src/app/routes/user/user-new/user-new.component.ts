import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../../models/response-api';
import { User } from '../../../models/user.model';
import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'hd-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  
  @ViewChild('form')
  form: NgForm
  
  shared: SharedService
  
  user: User = new User('', '', '', '')

  message: {}

  classCss: {}

  constructor( private route: ActivatedRoute, private userService: UserService ) {
    this.shared = SharedService.getInstance()
   }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id']
    if (id != undefined) {
      this.findById(id)
    }
  }

  findById(id: string) {
    this.userService.findById(id).subscribe((response: ResponseApi) => {
      this.user = response.data
      this.user.password = ''
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      })
    })
  }

  register() {
    this.message = {}
    this.userService.createOrUpdate(this.user).subscribe((response: ResponseApi) => {
      this.user = new User('', '', '', '')
      let userRet: User = response.data
      this.form.resetForm()
      this.showMessage({
        type: 'success',
        text: `Registered ${userRet.email} successfully!`
      })
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      })
    })
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
