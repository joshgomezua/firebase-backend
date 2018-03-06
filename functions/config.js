const functions = require('firebase-functions');

const config = functions.config();

const gmailConfig = config.gmail || {};
const dwollaConfig = config.dwolla || {};
const pushConfig = config.push || {};
const plaidConfig = config.plaid || {};

module.exports = {
    plaid: {
        client_id: plaidConfig.id || '',
        secret: plaidConfig.secret || '',
        public_key: plaidConfig.secret || ''
    },
    gmail: {
        email: gmailConfig.email || '',
        password: gmailConfig.password || ''
    },
    dwolla: {
        key: dwollaConfig.key || '',
        webkey: dwollaConfig.webkey || '',
        secret: dwollaConfig.secret || '',
        environment: dwollaConfig.environment || 'sandbox',
        webhook: dwollaConfig.webhook || ''
    },
    push: {
        key: pushConfig.key || ''
    }
};
