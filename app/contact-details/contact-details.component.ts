import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contact, Contact } from '../contact';
import { AppRoutingModule } from '../app-routing.module';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  formData: any;
  removeContact: any;

  contactUser: contact | undefined;
  formDataArray: any[] = []; 
  index:any;
  contacts: contact[] = []


  constructor(private router: Router,private localStorage: LocalStorageService, private route: ActivatedRoute){

    this.route.paramMap.subscribe(onChange =>
      this.ngOnInit()
      )
  }

  
  ngOnInit(){

    this.index = Number(this.route.snapshot.paramMap.get('index'))

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


  deleteContact(){
    this.index = Number(this.route.snapshot.paramMap.get('index'))
    this.formDataArray.splice(this.index, 1);
    this.localStorage.setData('formDataArray', JSON.stringify(this.formDataArray));
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['./contact', 'details', this.index])
    );
    this.localStorage.removeData('formData')
    this.localStorage.setData('formDataArray', JSON.stringify(this.formDataArray));
  }
  

}


