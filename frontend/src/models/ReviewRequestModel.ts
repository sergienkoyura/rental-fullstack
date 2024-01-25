class ReviewRequestModel {
    rating: number;
    itemId: string;
    reviewDescription?: string;

    constructor(rating: number, itemId: string, reviewDescription: string) {
        this.rating = rating;
        this.itemId = itemId;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewRequestModel;