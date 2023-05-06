import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contact } from '../contact';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{

  formData: any; 
  formDataArray: any[] = []; 
  index:any;
  contacts: contact[] = []
  contactUser: contact | undefined;

  constructor(private localStorage: LocalStorageService, private route: ActivatedRoute){
    this.route.paramMap.subscribe(onChange =>
      this.ngOnInit()
      )
  }

  ngOnInit() {     

    this.index = this.localStorage.getData('index');
    this.contacts = this.localStorage.getData('contacts') || '[]'
  
    const formData = this.localStorage.getData('formData');  
    if (formData) {   
      this.formData = JSON.parse(formData);  
    }   
    
    const formDataArrayString = this.localStorage.getData('formDataArray');  
    if (formDataArrayString) {   
      this.formDataArray = JSON.parse(formDataArrayString);  
    }  
    
    const formDataExists = this.formDataArray.some(formData => JSON.stringify(formData) === JSON.stringify(this.formData)); 

    if(!formDataExists){  
      if(this.formData != null){  
        this.formDataArray.push(this.formData);  
      }  
      this.localStorage.setData('formDataArray', JSON.stringify(this.formDataArray)); 
    }
     
  }

   displayDetails(index: number)
  { 
    console.log(this.contacts)
    this.localStorage.setData('index',JSON.stringify(index));
  }


}


