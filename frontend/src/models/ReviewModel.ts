class ReviewModel {
    id: string;
    userEmail: string;
    date: string;
    rating: number;
    item_id: string;
    reviewDescription?: string;

    constructor(id: string, userEmail: string, date: string, rating: number, item_id: string, reviewDescription?: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.date = date;
        this.rating = rating;
        this.item_id = item_id;
        this.reviewDescription = reviewDescription;
    }
}
export default ReviewModel;