import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Entities/User.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private _User: User;

  public FormUser:FormGroup;

  demo: any[] = [];

  constructor(private _FormBuilder:FormBuilder, private _UserService:UserService, private _MessageService: MessageService) { }

  ngOnInit() {

    this._User = this._UserService.GetCurrentUser();

    this.FormUser = this._FormBuilder.group({

      FirstName: new FormControl(this._User.FirstName, Validators.required),
      LastName: new FormControl(this._User.LastName, Validators.required),
      Email: new FormControl(this._User.Email, Validators.required),
      Phone: new FormControl(this._User.Phone, Validators.required)
    });

  }

  onSubmit(){
    alert(JSON.stringify(this.FormUser.value));
  }

  onUpload(event) {
    console.log(event);
    this._MessageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
}

}
