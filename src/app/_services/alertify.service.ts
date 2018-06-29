import {Injectable} from '@angular/core';

declare let alertify: any;

@Injectable()
export class AlertifyService {

  constructor() {
  }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, (event) => {
      if (event) {
        okCallback();
      } else {
        // TODO
        console.log('wha?');
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    console.log('poopz');
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
