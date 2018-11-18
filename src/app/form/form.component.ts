import { Component, OnInit, Injectable } from '@angular/core';
import { OcrService } from '../ocr.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

@Injectable()
export class FormComponent implements OnInit {

  codeLine1: String = '';
  codeLine2: String = '';

  constructor(private ocrService: OcrService) { }

  ngOnInit() {
  }

  readCode(event: any) {
    this.ocrService.read(event)
      .subscribe((data: any) => {
        console.log(data.Lines);
        this.populateForm(data.Lines);
      }, (error: any) => {
        console.log(error);
      });;
  };

  populateForm(lines: any[]) {

    if (!lines || lines.length < 2) {
      this.codeLine1 = "Unable to read MRZ";
      this.codeLine2 = "Unable to read MRZ";
      return;
    }

    this.codeLine1 = lines[lines.length - 2].LineText;
    this.codeLine2 = lines[lines.length - 1].LineText;

    var i: number;
    console.log('done');
  }
}
