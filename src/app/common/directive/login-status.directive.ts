import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';
import {TranslocoService} from "@ngneat/transloco";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Directive({
  selector: '[vfrLoginStatus]',
  standalone: true,
})
export class LoginStatusDirective implements OnChanges {

  @Input() isLoggedIn: boolean = false;

  constructor(private readonly el: ElementRef,
              private readonly renderer: Renderer2,
              private readonly translocoService: TranslocoService,
              private readonly router: Router,
              private auth: AuthService
  ) {
  }


  ngOnChanges() {
    const existingIcon = this.el.nativeElement.querySelector('i');
    if (existingIcon) {
      this.renderer.removeChild(this.el.nativeElement, existingIcon);
    }
    const icon = this.renderer.createElement('i');
    this.addClassToLoginElement(icon)
    this.renderer.appendChild(this.el.nativeElement, icon);
  }

  @HostListener('click') onClick() {
    this.isLoggedIn ? this.auth.logout() : this.router.navigate(['/login']);
  }

  private addClassToLoginElement(icon: any) {
    const text = this.isLoggedIn ? this.translocoService.translate("navbar.logout") : this.translocoService.translate("navbar.login");
    const textNode = this.renderer.createText(text);
    if (this.isLoggedIn) {
      this.renderer.addClass(icon, "bi-person-fill-check");
      this.renderer.addClass(icon, 'text-info')
      this.renderer.appendChild(icon, textNode);
      return
    }
    this.renderer.addClass(icon, "bi-person-fill-lock");
    this.renderer.addClass(icon, 'text-danger')
    this.renderer.appendChild(icon, textNode);
  }
}
