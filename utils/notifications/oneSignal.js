const OneSignal = require('@onesignal/node-onesignal');
const config = require('../../config/config');

const configParams = {
  userKey: config.oneSignalUserKey,
  appKey: config.oneSignalAppId,
};

const configuration = OneSignal.createConfiguration(configParams);

const client = new OneSignal.DefaultApi(configuration);

module.exports = client;
