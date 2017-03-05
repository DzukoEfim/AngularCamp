import {Component, OnInit} from '@angular/core';

@Component({
  styleUrls: ['./LoginForm.component.css'],
  templateUrl: './LoginForm.component.html'
})

export class LoginFormComponent implements OnInit {

  public userName = '';
  public pass = '';

  public onSubmit = function () {
      console.log(this.userName, this.pass);
  }

}
