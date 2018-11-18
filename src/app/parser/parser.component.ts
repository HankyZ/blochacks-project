import { Component, OnInit, Injectable } from '@angular/core';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { WSAECONNREFUSED } from 'constants';
import { $ } from 'protractor';
import { wrapListenerWithPreventDefault } from '@angular/core/src/render3/instructions';
import { getComponentViewByInstance } from '@angular/core/src/render3/context_discovery';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})

@Injectable()
export class ParserComponent implements OnInit {

  code : String = "P<CANMARTIN<<SARAH <<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019F2301147<<<<<<<<<<08";
  
  /*TEST #1
    "P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<"
    "ZE000509<9CAN8501019F2301147<<<<<<<<<<08"
  */

  /*TEST #2
    "P<TWNLIN<<MEI<HUA<<<<<<<<<<<<<<<<<<<<<<<"
    "0000000000TWN7601015F1404018A234567893<<<<18"
  */

  /*TEST #3
    "P<TWNLIN<<CHIEN<SHENG<<<<<<<<<<<<<<<<<<<<"
    "M000004264TWN6803029M9801048F122187664<<<<66"
  */

  /*TEST #4
    "P<QATAL<KAABI<<ALI<HAMAD<ABDULLAH<<<<<<<<<<<"
    "00000000<0QAT7103070M110725012345458902<<<78"
  */
  
  
  constructor() { 
    
  }
  
  ngOnInit() {
  }

  //Main Function
  main (code){
    
    var string1: string = code.substring(0,44)
    var string2: string = code.substring(45,88)
    return string1
    
    /*if(string1 != null){
      this.country(this.code)
      this.famNames(this.code)
      this.givenNames(this.code)
    } else {
      this.passNum(this.code)
      this.birthDate(this.code)
      this.gender(this.code)
      this.expiryDate(this.code)
    }*/
    
    
  }
  
  
  /*
  Machine Readable Zone - First Line
  */

  //Extract issuing country 
  country (code){
    var country: string = ((code.split("<"))[1]).substring(0,3)
    return country
  }
  
  //Extract family name
  famNames (code){  
    var list: string = (code.split("<<<")[0]).split("<<")[0]
    var strLen: number = list.length
    return (list.substring(5,strLen)).split("<")
  }

  //Extract all first names from MRZ
  givenNames(code){
    var list: string = (code.split("<<<")[0]).split("<<")[1].split("<")
    return list
  }

  /*
  Machine Readable Zone - Second Line
  */
  
  //Extract passport number
  passNum(code){
    var passNum: string = code.substring(0,9)
    var substring: string = "<"
    
    /*If the passport number contains "<": only extract all numbers before
    the "<"
    */
    if(passNum.substring){
      passNum = (passNum.split("<",1))[0]
      return passNum
    }
    return passNum
  }

  //Extract birthdate
  birthDate(code){
    var birthday: string = code.substring(13,19)
    return birthday
  }

  //Extract gender
  gender(code){
    var gender: string = code.substring(20,21)
    return gender
  }

  //Extract date of expiry
  expiryDate(code){
    var date: string = code.substring(21,27)
    return date
  }
  

}

