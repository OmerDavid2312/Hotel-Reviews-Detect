const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Logger = require('./Logger');
const Utils = require('./Utils');
let page,browser;
class Scrape {
    constructor(html){
        this.$ = cheerio.load(html);
    }
    static async openBrowser(baseURL){
        try {
            browser = await puppeteer.launch({headless:false, args:['--start-maximized' ]});
            page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(baseURL,{ waitUntil: 'load'});
        } catch (error) {
            Logger.error(error,__dirname);
        }
    }
    static async getPageURL(){
        return await page.url();   
    }

    static async gotoUrl(url){
         await page.goto(url,{ waitUntil: 'load'});
    }

    static async closeBrowser(){
        return await browser.close();
    }
    static async navigateToSection(siteName){
        if(siteName === 'tripadvisor'){
            await page.$eval("a[title='Hotels']",btn=> btn.click()); 
        }
        await page.waitForNavigation({ timeout: 120000,waitUntil: 'networkidle2' });

    }
    static async getUrlsToScrape(urlsSelector){
        return await page.$$eval(urlsSelector, as => as.map(a => a.href));
    }
    async getData(cityName,country,main,infoSelector){
        return new Promise((resolve,reject)=>{
            if(typeof main === 'object' && typeof infoSelector === 'object'){
                let hotelRating = this.$(infoSelector.rating).first().attr('class') && this.$(infoSelector.rating).first().attr('class').replace(/[^0-9]/g,'');
                let hotelClass = this.$(infoSelector.class).first().attr('title') && this.$(infoSelector.class).first().attr('title').split(' ')[0];

                let reviewsArray = [];
                let data = {
                    name: this.$(infoSelector.name).text().trim(),
                    address: this.$(infoSelector.address).text().trim(),
                    image: this.$(infoSelector.image).first().attr('src'),
                    rating: hotelRating && hotelRating.length == 1 ? parseFloat(hotelRating): parseFloat(hotelRating[0] + '.' + hotelRating[1]),
                    class: hotelClass ? parseFloat(hotelClass) : undefined,
                    about: this.$(infoSelector.about).text().trim(),
                    reviewCount: this.$(infoSelector.reviewCount).text() || undefined,
                    city:cityName,
                    country:country
                }
                this.$(main.wrapperSelector).each((i,el)=>{
                    let reviewRating = this.$(el).find(main.reviewsSelector.rating).attr('class').replace(/[^0-9]/g,'');
                    reviewsArray.push({
                        title:this.$(el).find(main.reviewsSelector.title).text().trim(),
                        rating:reviewRating.length == 1 ? parseFloat(reviewRating): parseFloat(reviewRating[0] + '.' + reviewRating[1]),
                        desc:this.$(el).find(main.reviewsSelector.desc).text().trim(),
                        user:this.$(el).find(main.reviewsSelector.user).text().trim(),
                    })
                })
                data.reviews = reviewsArray;
                resolve(data);
            }else{
                reject('Please provide an object')
            }
        })
    }
}

module.exports = Scrape;