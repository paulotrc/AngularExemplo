export class Page {


    // The number of elements in the page
    size = 0;
    // The total number of elements
    totalElements = 0;
    // The total number of pages
    totalPages = 0;
    // The current page number
    pageNumber = 0;


    constructor(model: any) {
        this.size = model.size || 20;
        this.totalElements = model.totalElements || 0;
        this.totalPages = model.totalPages || 0;
        this.pageNumber = model.pageNumber || 0;
    }


}
