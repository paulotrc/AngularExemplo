import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'siiga-debugger',
  templateUrl: './debugger.component.html',
  styleUrls: ['./debugger.component.scss']
})
export class DebuggerComponent implements OnInit, AfterViewInit {
  @Input()
  extraParamsFromParent: any;
  @Input()
  extraParams: any;
  @Input()
  model: any;
  @Input()
  listModels: any;
  @Input()
  data: any[];
  @Input()
  debugg: boolean;

  constructor(public storage: LocalStorageService) {

    this.storage.observe('debugg')
        .subscribe((newValue) => {

          this.debugg = (newValue) === 1;
          console.log(this.debugg);
    });

    this.debugg  =  this.storage.retrieve('debugg') === 1;


  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }


}
