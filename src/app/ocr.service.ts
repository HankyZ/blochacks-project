import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const URI = "https://api.cloudmersive.com/ocr/image/to/lines-with-location";

const httpHeaders = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'enctype': 'multipart/form-data',
    'language': 'ENG',
    'Apikey': '28e63794-ef8a-4616-80bb-26fdd3709a19'
  })
};


@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private http: HttpClient) { }

  read(event: any): any {
    let file: File = event.target.files[0];
    let formData: FormData = new FormData();
    formData.append('imageFile', file, file.name);
    formData.append('type', 'image/png');
    console.log("parsing ... ");

    return this.http.post(URI, formData, httpHeaders)
      .pipe();
  }
}
