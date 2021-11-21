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
                resolve(data[0]["current"]["temperature"]);
            });
        });
    }

    async update_bio() {

        const client = this.client;
        const date = new Date();
        let temperature = null;

        await this.get_weather().then(data => {
            temperature = data;
        });

        await client.simulate.preLoginFlow()
        await client.account.login(ig.username, ig.password);
      
        // log out of Instagram when done
        process.nextTick(async () => await client.simulate.postLoginFlow());
      
        // fill in whatever you want your new Instagram bio to be
        await client.account.setBiography(`Nous sommes le ${date.toLocaleDateString()}, il est ${date.getHours()+"h"+date.getMinutes()} \nIl fait ${temperature ? `${temperature}°C` : "FROID"} à Nantes \nProgramme made by Rome`);
    }
}

module.exports = InstaClient;