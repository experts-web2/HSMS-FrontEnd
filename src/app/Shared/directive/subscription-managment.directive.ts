import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appSubscriptionManagment]'
})
export abstract class SubscriptionManagmentDirective implements OnDestroy {

  componetDestroyed = new Subject<void>()

  constructor() {}

  ngOnDestroy(): void {
    this.componetDestroyed.next()
    this.componetDestroyed.unsubscribe()
  }

}
