console.log("Loading...");

const InstaClient = require("./structure/InstaClient");
const cron = require('node-cron');

const ig = new InstaClient();

ig.client.state.generateDevice(ig.username);

cron.schedule('0 0 */3 * * *', () => { // Every 3 hours
    ig.update_bio();
});