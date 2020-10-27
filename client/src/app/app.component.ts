import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  verAdmin = false;

  constructor(location: Location, router: Router) {
    // within our constructor we can define our subscription
    // and then decide what to do when this event is triggered.
    // in this case I simply update my route string.
    router.events.subscribe(val => {
      const route = location.path();
      if (route.match(/admin-voces/)) {
        this.verAdmin = true;
      } else {
        this.verAdmin = false;
      }
    });
  }

  ngOnInit(): void {
  }
}
