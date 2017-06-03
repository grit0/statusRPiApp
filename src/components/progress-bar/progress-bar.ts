// import { Component } from '@angular/core';

// /*
//   Generated class for the ProgressBarComponent component.

//   See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
//   for more info on Angular 2 Components.
// */
// @Component({
//   selector: 'progress-bar',
//   templateUrl: 'progress-bar.html'
// })
// export class ProgressBarComponentComponent {

//   text: string;

//   constructor() {
//     console.log('Hello ProgressBarComponent Component');
//     this.text = 'Hello World';
//   }

// }
import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
 
  @Input('progress') progress;
 
  constructor() {
 
  }
 
}