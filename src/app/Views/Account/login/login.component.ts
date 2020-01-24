import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

//Services PrimeNg
import { MessageService } from "primeng/api";
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';
import { MenuService } from '../../../Services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private _FormBuilder: FormBuilder, private _MesageService: MessageService, private _AuthenticationService: AuthenticationService, private _Route: Router) { }

  Loadin: boolean = false;
  FormLogin: FormGroup;

  ngOnInit() {
    this.FormLogin = this._FormBuilder.group({
      UserName: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required)
    });
  }

  onSubmit() {

    if (this.FormLogin.valid) {

      this.Loadin = true;

      this._AuthenticationService.Login(this.FormLogin.get('UserName').value, this.FormLogin.get('Password').value).subscribe(
        result => {

          this.Loadin = false;

          if (result.statusCode != "00") {
            this._MesageService.add({ severity: 'info', summary: 'Information', detail: result.message });
          } else {
            this._Route.navigate(['/Home/Default']);
          }
        
        },
        error => {
          this._MesageService.add({ severity: 'error', summary: 'Error', detail: error.message });
        });
    }
  }

}
