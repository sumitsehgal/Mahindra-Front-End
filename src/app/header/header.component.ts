import { Router } from '@angular/router';
import { LocalStorageService } from './../local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private routes: Router, private local: LocalStorageService) { }

  ngOnInit() {
  }

  logout() {
    this.local.removeStorage('tokenObject');
    if (!this.local.getStorage('tokenObject')) {
      this.routes.navigate(['/login']).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err); // when there's an error
      });
    }
  }
}
