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
            type: 'number',
            // september 2019
            defaultsTo: 1567285200
        },
        endDate: {
            type: 'number',
            // june 2020
            defaultsTo: 1593550799
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

