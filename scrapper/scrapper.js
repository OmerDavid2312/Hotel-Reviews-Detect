const Utils = require('./utils/Utils');
const Logger = require('./utils/Logger');
const Scrape = require('./utils/Scrape');
const { Mongo } = require('./data/Mongo');
const Config = require('./json/configuration.json')
const cities = require('./json/cities.json');

const startScrape = async () => {
    try {
        for await (const city of cities) {
                await Scrape.openBrowser(city.url);
                await Scrape.navigateToSection(Config.sitename);
                await Mongo.connectDB();
                const urls = await Scrape.getUrlsToScrape(Config.urlsSelector);
                for await (const url of urls) {
                    console.log(url);
                        await Scrape.gotoUrl(url)
                        const htmlBody = await Utils.getHTML(url);
                        const scrape = new Scrape(htmlBody);
                        const dataObject = await scrape.getData(city.name,city.country,Config.main,Config.infoSelector);
                        await Mongo.storeData(dataObject);
                }

                await Scrape.closeBrowser();
          }       
    } catch (error) {
        Logger.error(error);
    } finally {
        Logger.log('Done !');
    }

}
startScrape()