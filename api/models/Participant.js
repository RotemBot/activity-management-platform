/**
 * Participant.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        lastName: {
            type: 'string',
            required: false
        },
        dateOfBirth: {
            type: 'string',
            required: true,
            regex: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/i
        },
        id: {
            type: 'string',
            required: true,
            unique: true,
            regex: /^[0-9]{9}$/i
        },
        family: {
            model: 'family'
        },
        gender: {
            type: 'string',
            isIn: ['male', 'female'],
            required: true,
        },
        phoneNumber: {
            type: 'string',
            regex: /^05[0-9]-?[0-9]{3}-?[0-9]{4}$/i,
            required: false
        },
        jerseys: {
            collection: 'jersey',
            via: 'player'
        },
        group: {
            collection: 'group',
            via: 'subscriber',
            through: 'subscription'
        }
    },
};

