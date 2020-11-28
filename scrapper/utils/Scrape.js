const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Logger = require('./Logger');
const Utils = require('./Utils');
let page,browser;
class Scrape {
    hotelInfo;
    reviews = [];
    pageCount = 0;
    constructor(html){
        this.$ = cheerio.load(html);
    }
    static async openBrowser(baseURL){
        try {
            browser = await puppeteer.launch({headless:false, args:['--lang="en-US"','--start-maximized' ]});
            page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en'
              });
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
            await page.waitForNavigation({ timeout: 120000,waitUntil: 'networkidle2' });
            await page.$eval("label[for='checkbox_9'] a._1TxySsqs", hotelCheckBox => hotelCheckBox.click());
        }
        await page.waitForNavigation({ timeout: 120000,waitUntil: 'networkidle2' });
    }
    static async getUrlsToScrape(urlsSelector){
        return await page.$$eval(urlsSelector, as => as.map(a => a.href));
    }
    async getInfoData(cityName,country,infoSelector){
        return new Promise((resolve,reject)=>{
            if(typeof infoSelector === 'object'){
                let hotelRating = this.$(infoSelector.rating).first().attr('class') && this.$(infoSelector.rating).first().attr('class').replace(/[^0-9]/g,'');
                let hotelClass = this.$(infoSelector.class).first().attr('title') && this.$(infoSelector.class).first().attr('title').split(' ')[0];
                 this.hotelInfo = {
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
                resolve(this.hotelInfo);
            }else{
                reject('Please provide an object')
            }
        })
    }
    async getReviews(main){
            const PAGE_LIMIT = 20;
            this.$(main.wrapperSelector).each((i,el)=>{
                let reviewRating = this.$(el).find(main.reviewsSelector.rating).attr('class').replace(/[^0-9]/g,'');
                this.reviews.push({
                    title:this.$(el).find(main.reviewsSelector.title).text().trim(),
                    rating:reviewRating.length == 1 ? parseFloat(reviewRating): parseFloat(reviewRating[0] + '.' + reviewRating[1]),
                    desc:this.$(el).find(main.reviewsSelector.desc).text().trim(),
                    user:this.$(el).find(main.reviewsSelector.user).text().trim(),
                })
            })
            this.pageCount ++
            try {
                if(this.pageCount <= PAGE_LIMIT){
                    await page.$eval("span.pageNum.current.disabled + *",btn=> btn.click());
                    let url = await page.url();
                    let html = await Utils.getHTML(url);
                    this.$ = cheerio.load(html);
                    await this.getReviews(main);
                }
            } catch (error) {
                Logger.log(error);
            }finally{
                return this.reviews;
            }
      
    }

    async getData(cityName,country,main,info){
        let hotelInfoData = await this.getInfoData(cityName,country,info);
        let reviewsArray = await this.getReviews(main);
        hotelInfoData.reviews = reviewsArray;
        return {...hotelInfoData};
    }
}

module.exports = Scrape;