import {Component, OnDestroy, OnInit} from '@angular/core';
import { interval, Subscription, Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    /*    this.firstObsSubscription = interval( 1000).subscribe(count => {
          console.log(count);
        });*/

    // Store the Custom Observable into a constant
    // Instance a new Observable object to create an Observable
    // Then we need to pass into an anonymous arrow function the observer argument
    // The observer in the end is a part that is interested in being informed about new data, about errors or about the observable being completed.
    const customIntervalObservable = new Observable(observer => {
      // Now our job here is to tell the observer about new data, about an error or about the observable being completed. Here, we're not responsible for listening because the observer is the listener, here we get that listening part as an argument and we need to tell it once we're done, once new data is there and so on.
      let count = 0;
      setInterval( () => {
        // We can call the next method to emit a new value.
        observer.next(count);
        count++;
        if(count > 3) {
          // To emit the error message, we need to call the .error method
          observer.error(new Error('Count is greater 3!'));
        }
      }, 1000);
    });
    // An Observable instance begins publishing values only when someone subscribes to it. You subscribe by calling the subscribe() method of the instance, passing an observer object to receive the notifications.
    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      // to handler the error we need to pass another argument to subscribe
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
