const getReviewsTypeCount = async(hotel,type)=>{
    return new Promise((resolve,reject)=>{
        resolve(hotel.reviews.filter(review=>review.reliability === type).length);
    })
}

module.exports = {getReviewsTypeCount};