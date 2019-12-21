/**
 * ParticipantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
                error: error.toString()
            })
        }
    },

    async create (req, res) {
        try {
            const name = req.param('name')
            const birthDate = req.param('birth_date')
            const id = req.param('id')
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
                name,
                dateOfBirth: birthDate,
                id,
                family,
                gender,
                phoneNumber: phone
            })

            res.ok(participant)
        } catch (error) {
            sails.log.error(`Error creating participant`)
            return res.serverError({
                message: `Error creating a new participant`,
                error: error.toString()
            })
        }
    },

    async delete (req, res) {
        try {
            await Participant.destroy({ id: req.param('participant_id') })
            res.ok()
        } catch (error) {
            sails.log.error(`Error deleting participant`, { params: req.params })
            return res.serverError({
                message: `Error deleting participant - ID ${req.param('participant_id')}`,
                error: error.toString()
            })
        }
    },

    async update (req, res) {
        try {
            const id = req.param('participant_id')
            const updatedParticipant = await Participant.updateOne({ id }).set({ ...req.body })
            res.ok(updatedParticipant)
        } catch (error) {
            sails.log.error(`Error updating participant`, { error, params: req.param })
            return res.serverError({
                message: `Error updating a participant`,
                error: error.toString()
            })
        }
    }
};

