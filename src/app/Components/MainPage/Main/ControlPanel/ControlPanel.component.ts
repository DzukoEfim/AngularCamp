import {Component, OnInit} from '@angular/core';

@Component({
  styleUrls: ['./ControlPanel.component.css'],
  templateUrl: './ControlPanel.component.html'
})

export class ControlPanelComponent implements OnInit {

  public searchText = '';

  public onSearch = function (searchText) {
  //  onSearch handler
  };

  public onFind = function () {
  //  on Find button click handler
  };

  public addCourse = function () {
  //  on add new course button handler
  };

}
