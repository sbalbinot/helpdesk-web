import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'hd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  shared: SharedService

  constructor() {
    this.shared = SharedService.getInstance()
    this.shared.user = new User('', '', '', '')
  }

  ngOnInit() {
  }

  logout(): void {
    this.shared.token = null
    this.shared.user = null
    window.location.href = '/login'
    window.location.reload()
  }

}
