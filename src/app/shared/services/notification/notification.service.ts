import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {TranslocoService} from "@ngneat/transloco";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly notification: ToastrService,
              private readonly transloco: TranslocoService) {
  }


  public getSuccess<T extends object>(type: string, params: T) {
    this.notification.success(this.transloco.translate(
      type, {...params}
    ), this.transloco.translate(
      'commonToast.success'
    ),);
  }
  public getWarning<T extends object>(type: string, params: T) {
    this.notification.warning(this.transloco.translate(
      type, {...params}
    ), this.transloco.translate(
      'commonToast.info'
    ),);
  }


  public getFailure<T extends object>(type: string, params?: T) {
    this.notification.error(this.transloco.translate(
      type, {...params}
    ), this.transloco.translate(
      'commonToast.error'
    ),);
  }
}
