export interface User {
    id : String;
    email : String;
    role : String;
    name : String;
    cart_id : String;
    isAdmin : Boolean;
}

export interface NewUser {
    first_name : any;
    last_name : any;
    email : any;
    age : any;
    password : any;
}