import {Component, OnInit} from '@angular/core';

@Component({
  styleUrls: ['./Breadcrumbs.component.css'],
  templateUrl: './Breadcrumbs.component.html'
})

export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs = [
    {
      name: 'Course',
      url: 'test.html'
    }
  ];

  public onCrumbsNavigate = function (url) {
  //  navigate to url;
  }

}
