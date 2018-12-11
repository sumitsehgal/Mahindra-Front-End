import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getStorage(key: string) {
    return localStorage.getItem(key);
  }

  removeStorage(key: string) {
    return localStorage.removeItem(key);
  }

}
