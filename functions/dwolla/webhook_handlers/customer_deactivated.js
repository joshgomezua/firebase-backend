const ref = require('../../ref');

/**
 * handles customer_deactivated event from dwolla
 * @param {string} body.resourceId
 * @returns {Promise}
 */
function customerDeactivatedWebhook(body) {
    const customerID = body.resourceId;
    const updates = {};
    updates[`dwolla/customers/${customerID}/status`] = 'deactivated';
    return ref.update(updates);
}

module.exports = customerDeactivatedWebhook;
