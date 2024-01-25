class ItemModel {
    id: string;
    title: string;
    admin?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: any;

    constructor(id: string, title: string, admin: string, description: string,
        copies: number, copiesAvailable: number, category: string, img: any){
            this.id = id;
            this.title = title;
            this.admin = admin;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.img = img;
        }
}
export default ItemModel;