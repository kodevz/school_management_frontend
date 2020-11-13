import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  style = 'material';
  title = '';
  body = 'Lorem ipsum dolor sit amet!';
  timeout = 1000;
  position: SnotifyPosition = SnotifyPosition.centerCenter;
  progressBar = true;
  closeClick = true;
  newTop = true;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 80;

  errTitle = "Sory";
  errBody = "Something went wrong";

  successTitle = "Nice";
  successBody = "Success";

  constructor(private snotifyService: SnotifyService) { }

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  setPosition(position: SnotifyPosition) {
    this.position = position;

    console.log(this.position)
    return this;
  }
  onToast(toastfor?, body?, title?, config?) {
    if (toastfor == 'success') {
      this.onSuccess(body, config, title);
    }
    if (toastfor == 'info') {
      this.onInfo(body, config, title);
    }
    if (toastfor == 'error') {
      this.onError(body, config, title);
    }
    if (toastfor == 'warning') {
      this.onWarning(body, config, title);
    }
    if (toastfor == 'simple') {
      this.onSimple(body, config, title);
    }

  }

  onSuccess(body?, config?, title?) {
    this.snotifyService.success(body ? body : this.successBody, title ? title : this.title, config ? config : this.getConfig());
  }
  onInfo(body?, config?, title?) {
    this.snotifyService.info(body ? body : this.body, title ? title : this.title, config ? config : this.getConfig());
  }
  onError(body?, config?, title?) {
    this.snotifyService.error(body ? body : this.errBody, title ? title : this.title, config ? config : this.getConfig());
  }
  onWarning(body?, config?, title?) {
    this.snotifyService.warning(body ? body : this.body, title ? title : this.title, config ? config : this.getConfig());
  }
  onSimple(body?, config?, title?) {

    // const icon = `assets/custom-svg.svg`;
    const icon = `https://placehold.it/48x100`;

    this.snotifyService.simple(this.body, this.title, {
      ...this.getConfig(),
      icon: icon
    });
  }

  onAsyncLoading() {
    const errorAction = Observable.create(observer => {
      setTimeout(() => {
        observer.error({
          title: 'Error',
          body: 'Example. Error 404. Service not found',
        });
      }, 2000);
    });

    const successAction = Observable.create(observer => {
      setTimeout(() => {
        observer.next({
          body: 'Still loading.....',
        });
      }, 2000);

      setTimeout(() => {
        observer.next({
          title: 'Success',
          body: 'Example. Data loaded!',
          config: {
            closeOnClick: true,
            timeout: 5000,
            showProgressBar: true
          }
        });
        observer.complete();
      }, 5000);
    });

    /*
      You should pass Promise or Observable of type Snotify to change some data or do some other actions
      More information how to work with observables:
      https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/create.md
     */
    const { timeout, ...config } = this.getConfig(); // Omit timeout
    this.snotifyService.async('This will resolve with error', 'Async', errorAction, config);
    this.snotifyService.async('This will resolve with success', successAction, config);
    this.snotifyService.async('Called with promise', 'Error async',
      new Promise((resolve, reject) => {
        setTimeout(() => reject({
          title: 'Error!!!',
          body: 'We got an example error!',
          config: {
            closeOnClick: true
          }
        }), 1000);
        setTimeout(() => resolve(), 1500);
      }));
  }

  onConfirmation(body: string, title: string, callback: (action: string, args?: any, actions?: any) => void) {

    const { timeout, closeOnClick, ...config } = this.getConfig();
    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        { text: 'Yes', action: (toast) => { callback('yes', toast, this); this.snotifyService.remove(toast.id); }, bold: false },
        { text: 'No', action: (toast) => { callback('no', toast, this); this.snotifyService.remove(toast.id) } }
        // { text: 'Later', action: (toast) => { callback('later', toast, actions); this.snotifyService.remove(toast.id); } },
        // { text: 'Close', action: ('close', toast) => { callback('close', toast, actions); this.snotifyService.remove(toast.id); }, bold: true },
      ]
    });

    return this.snotifyService;
  }

  onLogoutConfirmation(body: string, title: string, callback: (action: string, args?: any, actions?: any) => void) {

    const { timeout, closeOnClick, ...config } = this.getConfig();
    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        { text: 'Yes', action: (toast) => { callback('yes', toast, this); this.snotifyService.remove(toast.id); }, bold: false },
        { text: 'No', action: (toast) => { callback('no', toast, this); this.snotifyService.remove(toast.id) } }
      ]
    });

    return this.snotifyService;
  }

  onConfirmationInfo(body: string, title: string) {

    const { timeout, closeOnClick, ...config } = this.getConfig();
    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        { text: 'Ok', action: (toast) => { this.snotifyService.remove(toast.id); }, bold: false },
        { text: 'Close', action: (toast) => { console.log('Clicked: Close'); this.snotifyService.remove(toast.id); }, bold: true },
      ]
    });
  }

  onPrompt(body: string, title: string, callback: (action: string, args?: any, actions?: any) => void) {

    const { timeout, closeOnClick, ...config } = this.getConfig();
    this.snotifyService.prompt(body, title, {
      ...config,
      buttons: [
        { text: 'Yes', action: (toast) => { callback('yes', toast, this); this.snotifyService.remove(toast.id); } },
        { text: 'No', action: (toast) => { callback('yes', toast, this); this.snotifyService.remove(toast.id); } },
      ],
      placeholder: 'Enter "ng-snotify" to validate this input' // Max-length = 40
    }).on('input', (toast) => {

      toast.valid = !!toast.value.match('ng-snotify');
    });
  }

  onHtml() {
    const html = `<div class="snotifyToast__title"><b>Html Bold Title</b></div>
    <div class="snotifyToast__body"><i>Html</i> <b>toast</b> <u>content</u></div>`;
    this.snotifyService.html(html, this.getConfig());
  }


  onClear() {
    this.snotifyService.clear();
  }
}
