import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hidePassword = true;
  username = '';
  password = '';
  constructor( private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
    if (!this.username) { return; }
    if (!this.password) { return; }


    this.usersService.findUser(this.username, this.password).subscribe(user => {
      if (user != null){
        this.router.navigate(['/home']);
      }
      else{
        alert("informations non valides")
      }
    });
 

  }
}
