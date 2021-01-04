const assert = require('assert');
const {expect} = require('chai');
const TestUtils = require('./core/TestUtils');
let TOKEN;
before( async () => {
  const response = await TestUtils.login({
    email:"test@gmail.com",
    password:"Test1234"
  })
  const json = await response.json()
  TOKEN = json.token;
});


describe('reviews prediction',()=>{

    it('should test review has predition ("truth","deceptive")', async ()=> {
        const response = await TestUtils.fetchRequest('/api/hotels/Barcelona/5fc23ac10fda4b139c1cece3','GET',null,TOKEN);
        const json = await response.json();
        const reliability1 = json.reviews[0].reliability;
        expect(reliability1 === "truth" || reliability1 === "deceptive").to.be.equals(true,reliability1);
    });

    it.skip('should test all reviews has predition ("truth","deceptive")', async ()=> {
        const response = await TestUtils.fetchRequest('/api/hotels/Barcelona/5fc23ac10fda4b139c1cece3','GET',null,TOKEN);
        const json = await response.json();
        for (let review of json.reviews) {
            const reliability = review.reliability;
            expect(reliability === "truth" || reliability === "deceptive").to.be.equals(true,JSON.stringify(review));       
        }
     
    });

})