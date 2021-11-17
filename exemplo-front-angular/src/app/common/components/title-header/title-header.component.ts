import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent implements OnInit {

  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
