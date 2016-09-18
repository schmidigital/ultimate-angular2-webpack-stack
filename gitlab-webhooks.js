var webhooks = require('gitlab-webhooks');
var current_dir = __dirname;

webhooks.init({
  token: 'T8PzcxqRmx2pBTmj', // Optional. Default: ''. Secret key
  port: 3000, // Optional. Default: 4400. Listen port
  //branches: [], // Optional. Default '*'. Branches for track
  events: ['push', 'merge_request', 'build'], // Optional. Default: 'push'. Event list for track
  onEvent: function() { /* some js */ }, // Optional. Default: null. Call before exec command
  command: 'cd ' + current_dir + '; git pull; npm install; npm run build:prod', // Optional. Shell command when triggered
  exit: false // Optional. Default: false. process.exit(0) after complete command (if you use Docker)
});
