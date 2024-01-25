class ItemRequestModel{
    title: string;
    admin: string;
    description: string;
    copies: number;
    category: string;
    img: any;

    constructor(title: string, admin: string, description: string, copies: number,
        category: string, img: any){
            this.title = title;
            this.admin = admin;
            this.description = description;
            this.copies = copies;
            this.category = category;
            this.img = img;
        }
}
export default ItemRequestModel;