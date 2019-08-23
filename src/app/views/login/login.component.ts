import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // Data test: test@minimalist.mx - 1234
  //email = 'test@minimalist.mx';
  //pass = '1234';
  public isLogin = true;
  public txt_Email_new: any = "";
  public loading = false;
  public user: user = {
    Email: "",
    Password: ""
  };

  constructor(
    private service: GeneralService,
    private message: MessageService,
    private routerObj: Router) {
  }

  ngOnInit() {
    if (this.service.getToken()) {
      this.routerObj.navigate(['/main']);
    }
  }

  ngAfterViewInit() {

  }

  login() {
    this.loading = true;
    this.service.service_general_post('login', this.user).subscribe(response => {
      //console.log(response.value.success);
      if (response.value.success) {
        localStorage.setItem('token', response.value.token);
        localStorage.setItem('user', JSON.stringify(response.value.result));
        this.loading = false;
        this.routerObj.navigate(['/main']);
      }
      else {
        this.message.messageSuccess(response.value.message);
        this.loading = false;
        //console.log(response.value.message);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.routerObj.navigate(['/login']);
  }

  change_pass() {
    this.loading = true;
    this.service.service_general_put('user/editpass', {
      "Email": this.txt_Email_new
    }).subscribe(response => {
      console.log(response);
      if (response.success) {
        this.message.messageSuccess(response.message);
        this.loading = false;
      }
      else {
        this.message.messageSuccess(response.message);
        this.loading = false;
      }
    });
  }

  change_password() {
    this.isLogin = false;
  }

  cancel() {
    this.isLogin = true;
  }
}

interface user {
  Email: string;
  Password: string;
}
