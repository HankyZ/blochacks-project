import { Component, OnInit, Injectable } from '@angular/core';
import { OcrService } from '../ocr.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

@Injectable()
export class FormComponent implements OnInit {

  errorMessage: string;
  loading: boolean;
  codeLine1: String;
  codeLine2: String;
  passportId: string;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  country: string;
  expirationDate: string;
  personalId: string;

  constructor(private ocrService: OcrService) { }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.errorMessage = '';
    this.loading = false;
    this.codeLine1 = '';
    this.codeLine2 = '';
    this.passportId = '';
    this.firstName = '';
    this.lastName = '';
    this.sex = '';
    this.dateOfBirth = '';
    this.country = '';
    this.expirationDate = '';
    this.personalId = '';
  }

  readCode(event: any) {
    this.reset();
    if (event.target.files[0].name.toLowerCase().indexOf(".png") > 0 || event.target.files[0].name.toLowerCase().indexOf(".jpg") > 0) {
      this.loading = true;
      this.errorMessage = '';
      this.ocrService.read(event)
        .subscribe((data: any) => {
          console.log(data.Lines);
          this.loading = false;
          this.processCode(data.Lines);
        }, (error: any) => {
          console.log(error);
        });;
    } else {
      this.errorMessage = "must be .png or .jpg file";
    }
  };


  processCode(lines: any[]) {
    if (!lines || lines.length < 2) {
      this.codeLine1 = 'Unable to read MRZ';
      this.codeLine2 = 'Unable to read MRZ';
      return;
    }

    var i: number;

    for (let line of lines) {
      if (line.LineText.length < 25) continue;
      if (!this.codeLine1 && line.LineText.charAt(0) === 'P' && line.LineText.indexOf('<') > 0) {
        this.codeLine1 = line.LineText.trim().split('(').join('<')
          .split(' ').join('').toUpperCase().split('$').join('S').split('5').join('S')
          .split('0').join('O').split('1').join('I');
        continue;
      }
      if (!this.codeLine2 && line.LineText.indexOf('<') > 0) {
        this.codeLine2 = line.LineText.trim().split('(').join('<')
          .split(' ').join('').toUpperCase().split('$').join('S');
      }
    }

    this.codeLine2 = this.codeLine2.substring(0, 13) + this.codeLine2.substring(13, 19)
      .split('O').join('0').split('S').join('5').split('I').join('1').split('\'')
      .join('1') + this.codeLine2.substring(19, 21) + this.codeLine2.substring(21, 27).split('O')
        .join('0').split('S').join('5').split('I').join('1') + this.codeLine2
          .substring(27, this.codeLine2.length);

    // filter out the double angle  quotes to two seperate quotes
    this.codeLine1.replace(/«/, '<<');
    this.codeLine1.replace(/»/, '>>');
    this.codeLine2.replace(/«/, '<<');
    this.codeLine2.replace(/»/, '>>');

    // remove all non ascii characters
    if (this.codeLine2.length > 44)
      this.codeLine2.replace(/[^\x00-\x7F]/g, '').replace(/‘/g, '');

    this.parseAll();
  }

  parseAll() {
    if (this.codeLine1 != null) {
      this.country = this.parseCountry();
      this.lastName = this.parseLastName();
      this.firstName = this.parseFirstName();
    }

    if (this.codeLine2 != null) {
      this.passportId = this.parsePassId();
      this.dateOfBirth = this.parseDateOfBirth();
      this.sex = this.parseSex();
      this.expirationDate = this.parseExpirationDate();
      this.personalId = this.parsePersonalId();
    }
  }

  parseCountry() {
    return this.codeLine1.split('<')[1].substring(0, 3);
  }

  parseLastName() {
    var list: string = (this.codeLine1.split('<<<')[0]).split('<<')[0];
    var lastNames: string[] = (list.substring(5, list.length)).split('<');

    var lastName: string = '';

    for (let i in lastNames)
      lastName += lastNames[i] + ' ';

    return lastName;
  }

  parseFirstName() {
    var firstNames: string[] = (this.codeLine1.split('<<<')[0]).split('<<')[1].split('<');
    var firstName: string = '';

    for (let i in firstNames)
      firstName += firstNames[i] + ' ';

    return firstName;
  }

  parsePassId() {
    var passId: string = this.codeLine2.substring(0, 9);
    if (passId.substring)
      passId = passId.split('<', 1)[0];
    return passId;
  }

  parseDateOfBirth() {
    return this.codeLine2.substring(13, 19);
  }

  parseSex() {
    return this.codeLine2.substring(20, 21);
  }

  parseExpirationDate() {
    return this.codeLine2.substring(21, 27);
  }

  parsePersonalId() {
    if (this.codeLine2.charAt(29) != '<')
      return this.codeLine2.substring(28, 44).split('<')[0];
    else
      return 'N/A';
  }
}
