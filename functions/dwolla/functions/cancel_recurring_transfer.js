const ref = require('../../ref');
const { getRecurringTransferProcessDate, getRecurringTransferData } = require('../utils');
const mailer = require('../../mailer');
const fcm = require('../../fcm');

/**
 * subscribes user from recurring transfer
 * @param {string} userID
 * @returns {Promise<string>}
 */
function cancelRecurringTransfer(userID, transferData) {
    const customerID = transferData.customer_id;
    return getRecurringTransferProcessDate(customerID).then(processDate => {
        const updates = {};
        getRecurringTransferData(customerID, processDate).then(recurData => {
            updates[`dwolla/recurring_transfers^customers/${processDate}/${customerID}`] = null;
            updates[`dwolla/customers^recurring_transfers/${customerID}`] = null;
            updates[`dwolla/users^recurring_transfers/${userID}`] = false;
            console.log('sending email and push notification');
            fcm.sendNotificationToUser(userID, 'Recurring transfer cancelled', 'Recurring transfer cancelled').catch(err => console.error(err));
            const message = `Just a heads up! You’ve cancelled a recurring \
            transfer for ${recurData.amount} to be deposited on the ${processDate} of each month,\
             from ${recurData.fund_name} to your Travel Account. You can contact tripcents support through \
             the “profile” screen of your app.`;
            const bodyDict = {
                body: message
            };
            mailer
                .sendTemplateToUser(
                    userID,
                    'Dwolla account suspended',
                    '63fc288b-b692-4d2f-a49a-2e8e7ae08263',
                    bodyDict,
                    'recurring transfer cancelled',
                    'recurring transfer cancelled'
                )
                .catch(err => console.error(err));

            return ref.update(updates);
        });
    });
}

module.exports = cancelRecurringTransfer;
