const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // Check this line! It must be exactly 'sandbox' in lowercase.
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

module.exports = paypal;