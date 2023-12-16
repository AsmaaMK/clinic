import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  getLocalStorageValue(key: string) {
    let value;
    if (isPlatformBrowser(this.platformId)) value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  setLocalStorageValue(key: string, value: any) {
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem(key, JSON.stringify(value));
  }

  removeFromLocalStorage(key: string) {
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem(key);
  }

  clearLocalStorage() {
    if (isPlatformBrowser(this.platformId)) localStorage.clear();
  }

  getSessionStorageValue(key: string) {
    let value;
    if (isPlatformBrowser(this.platformId)) value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  setSessionStorageValue(key: string, value: any) {
    if (isPlatformBrowser(this.platformId))
      sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeFromSessionStorage(key: string) {
    if (isPlatformBrowser(this.platformId)) sessionStorage.removeItem(key);
  }

  clearSessionStorage() {
    if (isPlatformBrowser(this.platformId)) sessionStorage.clear();
  }
}
