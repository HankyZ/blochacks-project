import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  readUrl(event:any) {
      console.log(event.target.files[0]);
  };

  processFile() {

  }
}
