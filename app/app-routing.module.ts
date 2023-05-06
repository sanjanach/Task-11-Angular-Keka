import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'form', component: ContactFormComponent },
  { path: 'home', component: HomeComponent},
  { path: 'contact', component: ContactListComponent, children:[
    {path: 'details/:index', component: ContactDetailsComponent} ] },
  { path: 'contact/details/:index/edit', component: ContactFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }