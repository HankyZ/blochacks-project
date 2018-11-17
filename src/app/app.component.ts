import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  testResponse : String;

  // Getting the id parameter from the URL and fetching its details
  parsePhotoToForm(url: String): void {
    this.testResponse = "test response";
  }
}
