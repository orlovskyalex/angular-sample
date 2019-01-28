import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {

  constructor(private storage: LocalStorageService) {
  }

  getToken(): string {
    return this.storage.get('intersurv_token');
  }

}
