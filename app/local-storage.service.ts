import { Injectable, LOCALE_ID } from '@angular/core';
import { contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setData(key:string, value:any){  
    localStorage.setItem(key, JSON.stringify(value))
  }

  getData(key:string):any{
    const data:any = localStorage.getItem(key)
    return data? JSON.parse(data) : null
  }

  removeData(key:string){
    localStorage.removeItem(key)
  }

  editData(index: number, number: number, contact: contact) {
    const data = JSON.parse(localStorage.getItem('formDataArray') || '[]');
    data.splice(index, 1, FormData);
    localStorage.setItem('formDataArray', JSON.stringify(data));
  }
  
}