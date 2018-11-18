import { Component, OnInit, Injector, Injectable } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})

@Injectable()
export class FormComponentComponent implements OnInit {

  code: String = "P<QATAL<KAABI<<ALI<HAMAD<ABDULLAH<<<<<<<<<<<00000000<0QAT7103070M110725012345458902<<<78";

  passportId: string;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  country: string;
  expirationDate: string;
  personalId: string;

  /*TEST #1
    "P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<"
    "ZE000509<9CAN8501019F2301147<<<<<<<<<<<<<<08"
  */

  /*TEST #2
    "P<TWNLIN<<MEI<HUA<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    "0000000000TWN7601015F1404018A234567893<<<18"
  */

  /*TEST #3
    "P<TWNLIN<<CHIEN<SHENG<<<<<<<<<<<<<<<<<<<<<<<"
    "M000004264TWN6803029M9801048F122187664<<<<66"
  */

  /*TEST #4
    "P<QATAL<KAABI<<ALI<HAMAD<ABDULLAH<<<<<<<<<<<"
    "00000000<0QAT7103070M110725012345458902<<<78"
  */


  constructor() {
    console.log(this.code.length)
  }

  ngOnInit() {
    this.passportId = '';
    this.firstName = '';
    this.lastName = '';
    this.sex = '';
    this.dateOfBirth = '';
    this.country = '';
    this.expirationDate = '';
    this.personalId = '';
  }

  readUrl(event: any) {
    console.log(event.target.files[0]);
    this.parseAll(this.code)
  };

  processFile() {

  }

  //Main Function
  parseAll(code) {

    var string1: string = code.substring(0, 44);
    var string2: string = code.substring(44, 88);

    if (string1 != null) {
      this.country = this.parseCountry(string1);
      this.lastName = this.parseLastName(string1);
      this.firstName = this.parseFirstName(string1);
    }

    if (string2 != null) {
      this.passportId = this.parsePassId(string2);
      this.dateOfBirth = this.parseDateOfBirth(string2);
      this.sex = this.parseSex(string2);
      this.expirationDate = this.parseExpiryDate(string2);
      this.personalId = this.parsePersonalId(string2.substring(28, 44));
    }

  }

  /*
  Machine Readable Zone - First Line
  */

  //Extract issuing country 
  parseCountry(code) {
    var country: string = ((code.split("<"))[1]).substring(0, 3);
    return country;
  }

  //Extract family name
  parseLastName(code) {
    var list: string = (code.split("<<<")[0]).split("<<")[0];
    var strLen: number = list.length;
    var lastNames: string[] = (list.substring(5, strLen)).split("<");
    var lastName: string = "";

    for (let i in lastNames) {
      lastName += lastNames[i] + " ";
    }
    
    return lastName;
  }


  //Extract all first names from MRZ
  parseFirstName(code) {

    var firstNames: string[] = (code.split("<<<")[0]).split("<<")[1].split("<");
    var firstName: string = "";

    for (let i in firstNames) {
      firstName += firstNames[i] + " ";
    }

    return firstName;
  }

  /*
  Machine Readable Zone - Second Line
  */

  //Extract passport number
  parsePassId(code) {
    var passId: string = code.substring(0, 9);
    var substring: string = "<";
    /*If the passport number contains "<": only extract all numbers before
    the "<"
    */
    if (passId.substring) {
      passId = (passId.split("<", 1))[0];
      return passId;
    }

    return passId;
  }

  //Extract birthdate
  parseDateOfBirth(code) {
    var dateOfBirth: string = code.substring(13, 19);
    return dateOfBirth;
  }

  //Extract gender
  parseSex(code) {
    var sex: string = code.substring(20, 21);
    return sex;
  }

  //Extract date of expiry
  parseExpiryDate(code) {
    var date: string = code.substring(21, 27);
    return date;
  }

  //Extract personal ID 
  parsePersonalId(code) {
    if (code.substring(1, 2) != "<") {
      return code.split("<")[0];
    } else {
      return "N/A";
    }
  }

}
