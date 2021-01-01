const fetch = require('node-fetch');
const BASEURL = "http://localhost:3000";
class TestUtils{
    static async fetchRequest(path,method='GET',data=null,token=null){
        const response = await fetch(BASEURL + path,{
            headers:{
                'Authorization':"Barer " + token,
                'Content-Type': 'application/json'
            },
            method: method,
            body: data ? JSON.stringify(data) : null
        });
        return await response
    }

    static async login(user){
        const response = await this.fetchRequest(`/api/users/login`,"POST",user);
        return response
    }
    static async register(user){
        const response = await this.fetchRequest(`/api/users/register`,"POST",user);
        return response
    }
}

module.exports = TestUtils