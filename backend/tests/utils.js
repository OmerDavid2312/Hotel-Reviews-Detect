require('dotenv/config');
const {expect} = require('chai');
const {sendEmail} = require('../utils/email');
const {client,setCache} = require('../configs/redis');
describe('utils',()=>{
    it('should send email', async ()=> {
        const email = await sendEmail({to:"hotelreviewsdetector@gmail.com",subject:"ping",text:"ping text"});
        expect(email.accepted[0]).to.be.equal("hotelreviewsdetector@gmail.com");
    });

    it('should test cache',()=>{
        const key = Math.floor(Math.random() * 10000000000000001) + new Date();
        const value = 'test';
        setCache(key,5000,value);
        client.get(key,(err,data)=>{
            expect(data).to.be.equal(value);
        })

    })
})