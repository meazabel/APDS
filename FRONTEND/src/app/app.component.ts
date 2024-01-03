import {Component} from '@angular/core';

// Component decorator that specifies the Angular structure of the component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';
}
