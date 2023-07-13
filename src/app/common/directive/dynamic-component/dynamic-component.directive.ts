import {ComponentFactory, Directive, Input, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[componentHost]',
  standalone:true
})
export class DynamicComponent {

  @Input() set componentHost(factory: ComponentFactory<any>) {
    if (factory) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(factory);
    }
  }

  constructor(public viewContainerRef: ViewContainerRef) {}
}
