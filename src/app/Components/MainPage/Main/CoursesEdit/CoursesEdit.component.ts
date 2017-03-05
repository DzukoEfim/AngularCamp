import {Component, OnInit} from '@angular/core';

@Component({
  styleUrls: ['./CoursesEdit.component.css'],
  templateUrl: './CoursesEdit.component.html'
})

export class Main implements OnInit {

  public name = '';
  public content = '';
  public date = '1111:11:11';

  public onCreate = function () {
  //  on create handler
  }
}
