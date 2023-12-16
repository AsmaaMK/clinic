import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  currentLang$: BehaviorSubject<string> = new BehaviorSubject(
    this.getInitialLang()
  );

  constructor(
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getInitialLang(): string {
    if (isPlatformBrowser(this.platformId)) {
      let storedLang = this.storageService.getLocalStorageValue('lang');
      if (storedLang) return storedLang;
      return 'en';
    }

    return '';
  }

  getLang(): string {
    return this.currentLang$.value;
  }

  setLang(lang: 'en' | 'ar') {
    this.currentLang$.next(lang);
    this.storageService.setLocalStorageValue('lang', this.currentLang$.value);
    this.setDirLangFont(lang);
  }

  setDirLangFont(lang = this.currentLang$.value) {
    if (isPlatformBrowser(this.platformId)) {
      if (lang === 'en') {
        document.dir = 'ltr';
        document.documentElement.setAttribute('lang', 'en');
        document.body.classList.replace('rtl-font', 'ltr-font');
      } else {
        document.dir = 'rtl';
        document.documentElement.setAttribute('lang', 'ar');
        document.body.classList.replace('ltr-font', 'rtl-font');
      }
    }
  }
}
