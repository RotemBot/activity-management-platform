/**
 * Subscription.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        group: {
            model: 'group'
        },
        subscriber: {
            model: 'participant'
        },
        startDate: {
            type: 'string',
            defaultsTo: '01-09-2019',
            regex: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/i
        },
        endDate: {
            type: 'string',
            defaultsTo: '30-06-2020',
            regex: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/i
        },
        status: {
            type: 'string',
            defaultsTo: 'active',
            isIn: ['active', 'suspended', 'cancelled', 'complete']
        },
        // 5780 = תש"ע
        year: {
            type: 'number',
            isInteger: true,
            min: 5775,
            max: 6000,
            required: true
        }

    },

};

