/**
 * Instructor.js
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
      idNumber: {
          type: 'string',
          required: true,
          unique: true,
          regex: /^[0-9]{9}$/i
      },
      phoneNumber: {
          type: 'string',
          regex: /^05[0-9]-?[0-9]{3}-?[0-9]{4}$/i,
          required: false
      },
      email: {
          type: 'string',
          required: true,
          unique: true,
          isEmail: true
      },
      groups: {
          collection: 'group',
          via: 'coach'
      }
  },

};

