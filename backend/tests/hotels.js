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

describe('hotels', () => {

    it('should get first 8 hotels (page=1)', async ()=> {
        const response = await TestUtils.fetchRequest('/api/hotels/Barcelona?page=1','GET',null,TOKEN);
        const status = await response.status;
        const json = await response.json();
        expect(status).to.be.equal(200);
        expect(json).include.keys('data');
        expect(json).include.keys('count');
    });

    it('should get first 8 hotels (page=2)', async ()=> {
        const response = await TestUtils.fetchRequest('/api/hotels/Barcelona?page=2','GET',null,TOKEN);
        const status = await response.status;
        const json = await response.json();
        expect(status).to.be.equal(200);
        expect(json).include.keys('data');
        expect(json).include.keys('count');
    });


    it('should get specifc hotel details', async ()=> {
        const response = await TestUtils.fetchRequest('/api/hotels/Barcelona/5fc23ac10fda4b139c1cece3','GET',null,TOKEN);
        const status = await response.status;
        const json = await response.json();
        expect(status).to.be.equal(200);
        expect(json).include.keys('class');
        expect(json).include.keys('about');
        expect(json).include.keys('name');
        expect(json).include.keys('reviews');
    });


    it('should faild get not found hotel details', async ()=> {
        const response = await TestUtils.fetchRequest('/api/hotels/Barcelona/5fc23ac10fda4b139c1cece2','GET',null,TOKEN);
        const status = await response.status;
        const json = await response.json();
        expect(status).to.be.equal(404);
    });

    it('should faild get invalid hotelID hotel details', async ()=> {
        const response = await TestUtils.fetchRequest('/api/hotels/Barcelona/5fc23ac10fda4b139c1cece2awdsadsad','GET',null,TOKEN);
        const status = await response.status;
        const json = await response.json();
        expect(status).to.be.equal(500);
    });

   
})