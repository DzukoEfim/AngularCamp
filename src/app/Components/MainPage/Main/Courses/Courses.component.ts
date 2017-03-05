import {Component, OnInit} from '@angular/core';

@Component({
  styleUrls: ['./Courses.component.css'],
  templateUrl: './Courses.component.html'
})

export class CoursesComponent implements OnInit {

  public courses = [
    {
      name: 'Course',
      time: '111:11',
      data: '1111.11.11',
      content: 'lorem ipsum lorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsum'
    },
    {
      name: 'Course',
      time: '111:11',
      data: '1111.11.11',
      content: 'lorem ipsum lorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsum'
    },
    {
      name: 'Course',
      time: '111:11',
      data: '1111.11.11',
      content: 'lorem ipsum lorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsum'
    },
    {
      name: 'Course',
      time: '111:11',
      data: '1111.11.11',
      content: 'lorem ipsum lorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsum'
    }
  ];

  public onCrumbsNavigate = function (url) {
  //  navigate to url;
  }

}
