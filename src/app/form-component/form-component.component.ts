import { Component, OnInit, Injectable } from '@angular/core';
import { OcrServiceService } from '../ocr-service.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})

@Injectable()
export class FormComponentComponent implements OnInit {

  constructor(private ocrService: OcrServiceService) {}

  ngOnInit() {
  }

  readUrl(event:any) {
      console.log(event.target.files[0]);
      this.ocrService.parse(event);
  };
}
