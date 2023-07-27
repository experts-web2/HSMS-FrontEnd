import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }
  encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, environment.encryptionKey).toString();
  }

  decryptData(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, environment.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  encryptToLocalStorage(key: string, data: any){
    let dataToEncrypt = JSON.stringify(data);
    let encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, environment.encryptionKey).toString();
    localStorage.setItem(key, encryptedData);
  }

  decryptFromLocalStorage(key: string): any{
    let encryptedData = localStorage.getItem(key) ?? '';
    let decryptedData = CryptoJS.AES.decrypt(encryptedData, environment.encryptionKey).toString(CryptoJS.enc.Utf8);
    if(decryptedData !== undefined && decryptedData !== null && decryptedData !== '') return JSON.parse(decryptedData);
    return null;
  }
}
