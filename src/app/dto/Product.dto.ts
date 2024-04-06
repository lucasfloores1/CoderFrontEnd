export interface Product {
    id : String;
    code : String;
    title : String;
    description : String;
    price : number;
    stock : number;
    type : Array<String>;
    thumbnails : Array<String>;
    owner : String;
    isAdmin : Boolean;
}

export interface NewProduct {
    code : String;
    title : String;
    description : String;
    price : number;
    stock : number;
    type : Array<String>;
    owner : String;
    isAdmin : Boolean;
}

export interface PaginationOptions {
    totalDocs: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevLink: string | null;
    nextLink: string | null;
    hasPagination: boolean;
  }