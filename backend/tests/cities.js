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

describe('cities', function() {

    it('should get all cities', async ()=> {
        const response = await TestUtils.fetchRequest('/api/cities','GET',null,TOKEN);
        const status = await response.status;
        const json = await response.json();
        expect(status).to.be.equal(200);
        expect(json).include.keys('data');
        expect(json).include.keys('count');
    });

    it('should get one city details', async ()=> {
        const response = await TestUtils.fetchRequest('/api/cities/Barcelona','GET',null,TOKEN);
        const status = await response.status;
        const json = await response.json();
        expect(status).to.be.equal(200);
        expect(json).include.keys('geo');
        expect(json).include.keys('name');
        expect(json).include.keys('country');
        expect(json).include.keys('image');
    });

});