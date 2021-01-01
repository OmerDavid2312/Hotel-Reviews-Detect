const assert = require('assert');
const {expect} = require('chai');
const TestUtils = require('./core/TestUtils');

describe('login', function() {

    it('should login', async ()=> {
      const response = await TestUtils.login({
        email:"test@gmail.com",
        password:"Test1234"
    });
      const status = await response.status;
      expect(status).to.be.equal(200);
    });
    
    it('should faild to login due to wrong password', async ()=> {
      const response = await TestUtils.login({
        email:"test@gmail.com",
        password:"test1234"
    });
      const status = await response.status;
      const json = await response.json();
      expect(json.message).to.be.equal('Email or Password is wrong');
      expect(status).to.be.equal(401);
    });

    it('should check password must contains at least 5 chars', async ()=> {
      const response = await TestUtils.login({
        email:"test@gmail.com",
        password:"11"
    });
      const status = await response.status;
      const json = await response.json();
      expect(json.errors[0].msg).to.be.equal('Password must contain at least 5 character');
      expect(status).to.be.equal(422);
    });

    it('should check faild login due no register user', async ()=> {
      const response = await TestUtils.login({
        email:"dasdsaasddsaasddsasad@gmail.com",
        password:"asdasdsadadssad"
    });
      const status = await response.status;
      const json = await response.json();
      expect(json.message).to.be.equal('Email or Password is wrong');
      expect(status).to.be.equal(401);
    });

});

describe('auth faild', () => {

  it('should auth faild due to no login', async ()=> {
    const response = await TestUtils.fetchRequest('/api/cities','GET',null,null);
    const status = await response.status;
    expect(status).to.be.equal(401);
  });
  

});