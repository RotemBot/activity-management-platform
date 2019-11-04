/**
 * Jersey.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        player: {
            model: 'participant'
        },
        number: {
            type: 'number',
            required: true,
            min: 1,
            max: 99,
            isInteger: true
        },
        size: {
            type: 'string',
            required: true,
            isIn: ['4-6', '8-10', '12-14', '16-18', 'S', 'M', 'L']
        }

    },

};

