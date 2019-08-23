import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {
  public user_name: any;

  constructor(private service: GeneralService, private routerObj: Router) { }

  ngOnInit() {
    //console.log(this.service.isLogin());
    if (!this.service.getToken()) {
      this.routerObj.navigate(['/login']);
    }
    this.user_name = JSON.parse(localStorage.getItem("user")).email;
    //console.log(JSON.parse(localStorage.getItem("user")).email);
  }
}
