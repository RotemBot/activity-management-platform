/**
 * Group.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        location: {
            model: 'location'
        },
        ageGroup: {
            type: 'number',
            required: true,
            min: 0,
            max: 3,
            isInteger: true
        },
        isCompetitive: {
            type: 'boolean',
            defaultsTo: false
        },
        coach: {
            model: 'instructor'
        },
        participants: {
            collection: 'participant',
            via: 'group',
            through: 'subscription'
        },
        color: {
            type: 'string',
            required: false,
            regex: /^#[0-9A-F]{6}$/i,
            defaultsTo: '#ffffff'
        }

    },
};

