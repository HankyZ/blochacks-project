import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const URI = "https://api.cloudmersive.com/ocr/image/toText";

const httpHeaders = {
headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'Apikey': '28e63794-ef8a-4616-80bb-26fdd3709a19'
  })
};


@Injectable({
  providedIn: 'root'
})
export class OcrServiceService {

  constructor(private http: HttpClient) { }

  parse(event:any) {
    console.log("parsing ... ");
    let file: File = event.target.files[0];
    let formData: FormData = new FormData();
    formData.append('imageFile', file, file.name);
    formData.append('type', 'image/png');

    console.log("printing everything");
    console.log(formData);
    console.log(httpHeaders);
    this.http.post(URI, formData, httpHeaders)
    .pipe(
       catchError(() => {return throwError('Something bad happened')})
     );

    //
    // .map(res => res.json())
    // .subscribe((data:any) => {
    //   console.log(JSON.stringify(data));
    // },
    // (error:any) => {
    //   console.log(error);
    // })
  }
}
