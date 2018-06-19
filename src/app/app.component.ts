import { Component } from '@angular/core';
import { trigger, transition, group, query, style, animate, animateChild } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(':enter',
            [
              style({ opacity: 0 }),
              animate(
                '0.5s ease-in-out',
                style({ opacity: 1 })
              ),
              animateChild()
            ],
            { optional: true }
          ),
          query(':leave',
            [
              style({ opacity: 0 }),
              animate('0.5s ease-in-out', style({ opacity: 0 })),
              animateChild()
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]

})
export class AppComponent {

  public getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'curriculums';
  }

}
