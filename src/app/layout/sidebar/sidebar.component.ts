import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'hd-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  shared : SharedService;
  
  constructor(){
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

}
