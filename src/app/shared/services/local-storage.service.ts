import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  get(key: string): any {
    return this.storage.get(key);
  }

  set(key: string, value: any): void {
    this.storage.set(key, value);
  }

  has(key: string): boolean {
    return this.storage.has(key);
  }

  remove(key: string): void {
    this.storage.remove(key);
  }

  clear(): void {
    this.storage.clear();
  }

}
