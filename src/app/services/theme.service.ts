import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new BehaviorSubject<boolean>(this.cookieService.check('theme') ? this.cookieService.get('theme') === 'dark' : false);
  isDarkTheme = this._darkTheme.asObservable();

  constructor(private cookieService: CookieService) { }

  isLightTheme() {
    return !this._darkTheme.value;
  }

  toogleTheme() {
    // console.log('toogleTheme');
    var currentTheme = this.cookieService.get('theme');
    // console.log('currentTheme', currentTheme);

    const htmlTag = document.querySelector('html');
    if (currentTheme === 'dark') {
      this.cookieService.set('theme', 'light');
      htmlTag?.setAttribute('data-bs-theme', 'light');
    } else {
      this.cookieService.set('theme', 'dark');
      htmlTag?.setAttribute('data-bs-theme', 'dark');
    }
    this._darkTheme.next(!this._darkTheme.value);
  }

  setCurrentTheme() {
    const htmlTag = document.querySelector('html');
    if (this.cookieService.check('theme')) {
      htmlTag?.setAttribute('data-bs-theme', this.cookieService.get('theme'));
    } else {
      htmlTag?.setAttribute('data-bs-theme', 'light');
    }
  }
}