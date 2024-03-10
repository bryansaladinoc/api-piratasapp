const OneSignal = require('@onesignal/node-onesignal');
const config = require('../../config/config');

const configParams = {
  userKey: 'MDNhNWIxNjQtYzk4Mi00ODI5LTk3ZmQtZTVjYjYxZGFlOWYy',
  appKey: '9e3a4ffb-b6b8-4533-803a-6f8d1c95feb9',
};

const configuration = OneSignal.createConfiguration(configParams);

const client = new OneSignal.DefaultApi(configuration);

module.exports = client;
