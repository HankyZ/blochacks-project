import { Component, OnInit, Injectable } from '@angular/core';
import { OcrService } from '../ocr.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

@Injectable()
export class FormComponent implements OnInit {

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
    this.ocrService.read(event)
      .subscribe((data: any) => {
        console.log(data.Lines);
        this.processCode(data.Lines);
      }, (error: any) => {
        console.log(error);
      });;
  };


  processCode(lines: any[]) {
    if (!lines || lines.length < 2) {
      this.codeLine1 = "Unable to read MRZ";
      this.codeLine2 = "Unable to read MRZ";
      return;
    }

    this.codeLine1 = lines[lines.length - 2].LineText.trim().split('(').join('<').split(' ').join('').toUpperCase();
    this.codeLine2 = lines[lines.length - 1].LineText.trim().split('(').join('<').split(' ').join('').toUpperCase();

    this.parseAll();
  }

  parseAll() {
    if (this.codeLine1 != null) {
      this.country = this.parseCountry(this.codeLine1);
      this.lastName = this.parseLastName(this.codeLine1);
      this.firstName = this.parseFirstName(this.codeLine1);
    }

    if (this.codeLine2 != null) {
      this.passportId = this.parsePassId(this.codeLine2);
      this.dateOfBirth = this.parseDateOfBirth(this.codeLine2);
      this.sex = this.parseSex(this.codeLine2);
      this.expirationDate = this.parseExpirationDate(this.codeLine2);
      this.personalId = this.parsePersonalId(this.codeLine2.substring(28, 44));
    }
  }

  parseCountry(code) {
    var country: string = ((code.split("<"))[1]).substring(0, 3);
    return country;
  }

  parseLastName(code) {
    var list: string = (code.split("<<<")[0]).split("<<")[0];
    var strLen: number = list.length;
    var lastNames: string[] = (list.substring(5, strLen)).split("<");
    var lastName: string = "";

    for (let i in lastNames)
      lastName += lastNames[i] + " ";

    return lastName;
  }

  parseFirstName(code) {
    var firstNames: string[] = (code.split("<<<")[0]).split("<<")[1].split("<");
    var firstName: string = "";

    for (let i in firstNames) {
      firstName += firstNames[i] + " ";
    }

    return firstName;
  }

  parsePassId(code) {
    var passId: string = code.substring(0, 9);
    var substring: string = "<";
    if (passId.substring)
      passId = (passId.split("<", 1))[0];
    return passId;
  }

  parseDateOfBirth(code) {
    var dateOfBirth: string = code.substring(13, 19);
    return dateOfBirth;
  }

  parseSex(code) {
    var sex: string = code.substring(20, 21);
    return sex;
  }

  parseExpirationDate(code) {
    var date: string = code.substring(21, 27);
    return date;
  }

  parsePersonalId(code) {
    if (code.substring(1, 2) != "<")
      return code.split("<")[0];
    else
      return "N/A";
  }
}
