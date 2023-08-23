import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";

@Component({
    selector: 'vfr-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
    templateUrl: './login-not-match.component.html',
    styleUrls: ['./login-not-match.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginNotMatchComponent {

}
