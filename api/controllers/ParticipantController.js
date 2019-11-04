/**
 * ParticipantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const uuidv4 = require('uuid/v4')

module.exports = {

    async get (req, res) {
        try {
            const participant = await Participant.findOne({ id: req.param('participant_id')})
            if (!participant) {
                throw new Error('No participant matches given ID')
            }
            return res.ok(participant)
        } catch (error) {
            sails.log.error(`Error fetching participant`, { req, error })
            return res.serverError({
                message: `Error fetching participant's details - ID ${req.param('participant_id')}`,
                error
            })
        }
    },

    async create (req, res) {
        try {
            const name = req.param('name')
            const birthDate = req.param('birth_date')
            const idNumber = req.param('id')
            const family = req.param('family_id')
            const gender = req.param('gender')
            const phone = req.param('phone')

            const familyExists = await Family.findOne({ id: family})
            if (!familyExists) {
                return res.serverError({
                    message: 'A Participant must be related to a family',
                    error: null
                })
            }

            const participant = await Participant.create({
                id: uuidv4(),
                name,
                dateOfBirth: birthDate,
                idNumber,
                family,
                gender,
                phoneNumber: phone
            })

            res.ok(participant)
        } catch (error) {
            sails.log.error(`Error creating participant`)
            return res.serverError({
                message: `Error creating new participant`,
                error
            })
        }
    }

};

