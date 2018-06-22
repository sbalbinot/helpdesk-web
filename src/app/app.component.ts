import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'hd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public shared: SharedService
  showTemplate: boolean

  constructor() {
    this.shared = SharedService.getInstance()
  }

  ngOnInit() {
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    )
  }

  showContentWrapper() {
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }
  }
}
