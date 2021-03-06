const weather = require('weather-js');
const { username, password } = require("../config.json");
const { IgApiClient } = require("instagram-private-api");

class InstaClient {
    constructor() {
        this.password = password;
        this.username = username;

        this.client = new IgApiClient();
    }

    async get_weather() {
        return new Promise(async (resolve, reject) => {
            await weather.find({search: 'Nantes', degreeType: 'C'}, async function(err, data) {
                if(err) reject(err);
                resolve(data[0]["current"]);
            });
        });
    }

    async update_bio() {

        const client = this.client;
        const date = new Date();

        let temperature = null;
        let humidity = null;

        await this.get_weather().then(data => {
            temperature = data.temperature;
            humidity = data.humidity;
        });

        // await client.simulate.preLoginFlow() // USELESS
        await client.account.login(this.username, this.password);
      
        // log out of Instagram when done
        process.nextTick(async () => await client.simulate.postLoginFlow());
      
        // fill in whatever you want your new Instagram bio to be
        await client.account.setBiography(`Dernière actualisation le ${date.toLocaleDateString()}, à ${date.getHours()}h${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} \nIl fait ${temperature ? `${temperature}°C` : "FROID"} avec ${humidity ? `${humidity}%` : "TROP"} d'humidité à Nantes \nMade by Rome with ❤️`);
        console.log(`Posted on ${date.getHours()}h${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} !`);
    }
}

module.exports = InstaClient;