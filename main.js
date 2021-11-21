console.log("Loading...");

const InstaClient = require("./structure/InstaClient");
const cron = require('node-cron');

const ig = new InstaClient();

ig.client.state.generateDevice(ig.username);

cron.schedule('0 0 */3 * * *', () => {
    ig.update_bio();
});