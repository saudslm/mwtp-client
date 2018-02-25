import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = {
    username: "",
    password: ""
  }

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onLoginFormSubmit() {
    //e.preventDefault();
    this.httpClient.post(environment.apiUrl + "account/login", {
      username: this.model.username,
      password: this.model.password
    }).subscribe(
        (data:any[]) => {
          localStorage.setItem("userToken", data["personId"]);
          localStorage.setItem("userRole", data["role"]);
          if( data['role'] == "employee" ) {
              this.router.navigate(['employee/dashboard']);
          } else {
              this.router.navigate(['manager/dashboard']);
          }
        }
    )
    return false;
  }

}
