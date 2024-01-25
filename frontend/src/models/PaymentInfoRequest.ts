class PaymentInfoRequest{
    amount: number;
    currency: string;
    receipt: string | undefined;

    constructor( amount: number, currency: string, receipt: string | undefined){
        this.amount = amount;
        this.currency = currency;
        this.receipt = receipt;
    }
}

export default PaymentInfoRequest;