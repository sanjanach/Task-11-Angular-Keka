import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createFind } from 'rxjs/internal/operators/find';
import { Contact, contact } from '../contact';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements  OnInit{

  contacts: contact[] = []


  index:any = this.localStorage.getData('index')
  
  formDataArray: any[] = [];

  constructor(private router: Router,private localStorage: LocalStorageService, private route: ActivatedRoute){

  }

  formData = this.localStorage.getData('formData');

  ngOnInit(): void {


    this.index = +this.localStorage.getData('index'); 
    this.contacts = this.localStorage.getData('contacts') || '[]'

    
    console.log(this.contacts)

    if (this.formData) {   
      this.contactForm.setValue(JSON.parse(this.formData));  
    } 
    
   this.editContact();

  }


  contactForm = new FormGroup({
    contactId : new FormControl(),
    contactName : new FormControl('' , [Validators.required]),
    contactEmail : new FormControl('', [Validators.required, Validators.email]),
    contactMobile : new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    contactLandline : new FormControl(),
    contactWebsite : new FormControl(),
    contactAddress : new FormControl()
  })

  
  get contactName(){
    return this.contactForm.get('contactName');
  }

  get contactEmail(){
    return this.contactForm.get('contactEmail');
  }

  get contactMobile(){
    return this.contactForm.get('contactMobile')
  }

  get contactLandline(){
    return this.contactForm.get('contactLandline')
  }
  get contactWebsite(){
    return this.contactForm.get('contactWebsite')
  }
  get contactAddress(){
    return this.contactForm.get('contactAddress')
  }
  

  addContact(formData: any) {


    this.route.paramMap.subscribe(
      params=>{
        let index = params.get('index');
        if(index){

          let updatedFormData = {
            contactId: formData.contactId,
            contactName: formData.contactName,
            contactEmail: formData.contactEmail,
            contactMobile: formData.contactMobile,
            contactLandline: formData.contactLandline,
            contactWebsite: formData.contactWebsite,
            contactAddress: formData.contactAddress
          };
        
          let index = this.index;
      
          let formDataArrayString = this.localStorage.getData('formDataArray');
          let formDataArray = JSON.parse(formDataArrayString) || [];
        
          formDataArray.splice(index, 1, updatedFormData);
        
          this.localStorage.setData('formDataArray', JSON.stringify(formDataArray));

          this.router.navigate(['/contact', 'details', index, 'edit'])
        }else{

          console.log("wirl")
          this.localStorage.setData('formData', JSON.stringify(formData));
          this.router.navigate(['/form'])
        }
      }
    )
    this.contactForm.reset()

    console.log(formData.contactName);
    
  }

  clearForm(){
    this.contactForm.reset()
  }



  editContact() {
    const index = this.index;
    const formDataArrayString = this.localStorage.getData('formDataArray');
  
    if (formDataArrayString) {
      this.formDataArray = JSON.parse(formDataArrayString);
    }
  
    const formData = this.formDataArray[index];
  
    if (formData) {
      this.contactForm.setValue({
        contactId: formData.contactId,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactMobile: formData.contactMobile,
        contactLandline: formData.contactLandline,
        contactWebsite: formData.contactWebsite,
        contactAddress: formData.contactAddress
      });
    }

  }
  
}