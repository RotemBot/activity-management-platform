/**
 * ContactController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuidv4 = require('uuid/v4')

module.exports = {

    async get (req, res) {
        try {
            const contact = await Contact.findOne({ id: req.param('contact_id')})
            if (!contact) {
                throw new Error('No contact matches given ID')
            }
            res.ok(contact)
        } catch (error) {
            sails.log.error(`Error fetching contact`, { req, error })
            return res.serverError({
                message: `Error fetching contact's details - ID ${req.param('contact_id')}`,
                error
            })
        }
    },

    async create (req, res) {
        try {
            const firstName = req.param('first_name')
            const lastName = req.param('last_name')
            const phoneNumber = req.param('phone')
            const email = req.param('email')
            const gender = req.param('gender')
            const familyId = req.param('family_id')
            const role = req.param('role')

            let family = await Family.findOne({ id: familyId })
            if (!family) {
                return res.serverError({
                    message: 'A Contact must be related to a family',
                    error: null
                })
            }

            const contact = await Contact.create({
                id: uuidv4(),
                firstName,
                lastName,
                phoneNumber,
                email,
                gender
            })

            await Family.updateOne({id: familyId}).set(role === 'primary' ? { primaryContact: contact.id } : { secondaryContact: contact.id })
            family = await Family.findOne({ id: familyId }).populate(`${role}Contact`)

            res.ok(family)
        }
         catch (error) {
             sails.log.error(`Error creating contact`)
             return res.serverError({
                 message: `Error creating new contact`,
                 error
             })
        }
    }

};

