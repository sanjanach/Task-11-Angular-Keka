export interface contact {
    id: number;
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;
  }
  
  export class Contact implements contact {
    constructor( public id: number, public name: string, public email: string, public mobile: string, public landline: string, public website: string, public address: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.mobile = mobile;
      this.landline = landline;
      this.website = website;
      this.address = address;
    }

  }
  