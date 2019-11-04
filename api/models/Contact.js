/**
 * Contact.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        firstName: {
            type: 'string',
            required: true
        },
        lastName: {
            type: 'string',
            required: true
        },
        phoneNumber: {
            type: 'string',
            regex: /^05[0-9]-?[0-9]{3}-?[0-9]{4}$/i,
            required: true
        },
        email: {
            type: 'string',
            isEmail: true
        },
        gender: {
            type: 'string',
            required: true,
            isIn: ['male', 'female']
        }
    },

};

