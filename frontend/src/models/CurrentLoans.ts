import ItemModel from "./ItemModel";

class CurrentLoans{
    item: ItemModel;
    daysLeft: number;

    constructor(item: ItemModel, daysLeft: number) {
        this.item = item;
        this.daysLeft = daysLeft;
    }
    
}

export default CurrentLoans;