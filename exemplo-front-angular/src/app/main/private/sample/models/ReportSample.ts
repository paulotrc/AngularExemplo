export class ReportSample {
    from: any;
    client: any;
    number: any;
    date: any;
    dueDate: any;
    services: any[
    ];
    subtotal: any;
    tax: any;
    discount: any;
    total: any;


    constructor(model) {
        this.from = model.from || {};
        this.client = model.client || {};
        this.number = model.number;
        this.date = model.date;
        this.dueDate = model.dueDate;
        this.services = model.services || [];
        this.subtotal = model.subtotal;
        this.tax = model.tax;
        this.discount = model.discount;
        this.total = model.total;
    }
}
