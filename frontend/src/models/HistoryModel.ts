class HistoryModel {
    id: string;
    userEmail: string;
    checkoutDate: string;
    returnedDate: string;
    title: string;
    admin: string;
    description: string;
    img: any;
    constructor(id: string, title: string, admin: string, description: string,
        userEmail: string, checkoutDate: string, returnedDate: string, img: any) {
        this.id = id;
        this.title = title;
        this.admin = admin;
        this.description = description;
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.img = img;
    }
}
export default HistoryModel;