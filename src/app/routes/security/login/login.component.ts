import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../../../models/current-user.model';
import { User } from '../../../models/user.model';
import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'hd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('','','','')
  shared: SharedService
  message: string

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.shared = SharedService.getInstance()
   }

  ngOnInit() {
  }

  login() {
    this.message = ''
    this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token
      this.shared.user = userAuthentication.user
      this.shared.user.profile = this.shared.user.profile.substring(5)
      this.shared.showTemplate.emit(true)
      this.router.navigate(['/'])
    }, error => {
      this.shared.token = null
      this.shared.user = null
      this.shared.showTemplate.emit(false)
      this.message = 'erro'
    })
  }

  cancelLogin() {
    this.message = ''
    this.user = new User('','','','')
    window.location.href = '/login'
    window.location.reload()
  }

  getFromGroupClass(isInvalid: boolean, isDirty: boolean) {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    }
  }

}
