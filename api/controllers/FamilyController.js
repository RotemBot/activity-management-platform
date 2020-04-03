/**
 * FamilyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const uuidv4 = require('uuid/v4')

module.exports = {

    async get (req, res) {
        try {
            const family = await Family.findOne({ id: req.param('family_id')})
                .populate('children')
                .populate('primaryContact')
                .populate('secondaryContact')
            if (!family) {
                throw new Error('No family matches given ID')
            }
            res.ok(family)
        } catch (error) {
            sails.log.error(`Error fetching family`, { params: req.param() })
            return res.serverError({
                message: `Error fetching family's details - ID ${req.param('family_id')}`,
                error: error.toString()
            })
        }
    },

    async getByEmail (req, res) {
        try {
            const family = await Family.findOne({ id: req.param('email')})
                .populate('children')
                .populate('primaryContact')
                .populate('secondaryContact')
            if (!family) {
                throw new Error('No family matches given email')
            }
            res.ok(family)
        } catch (error) {
            sails.log.error(`Error fetching family`, { params: req.param() })
            return res.serverError({
                message: `Error fetching family's details - email ${req.param('email')}`,
                error: error.toString()
            })
        }
    },

    async delete (req, res) {
        try {
            await Family.destroy({ id: req.param('family_id') })
            res.ok()
        } catch (error) {
            sails.log.error(`Error deleting family`, { params: req.params })
            return res.serverError({
                message: `Error deleting family - ID ${req.param('family_id')}`,
                error: error.toString()
            })
        }
    },

    async create (req, res) {
        try {
            const name = req.param('name')
            const homeTown = req.param('homeTown')
            const email = req.param('email')

            const existingFamily = await Family.findOne({ email })
                .populate('children')
                .populate('primaryContact')
                .populate('secondaryContact')

            if (existingFamily) {
                return res.ok(existingFamily)
            }

            const family = await Family.create({
                id: uuidv4(),
                name,
                homeTown,
                email
            })

            res.ok(family)
        } catch (error) {
            sails.log.error(`Error creating family`, { error, params: req.param })
            return res.serverError({
                message: `Error creating new family`,
                error: error.toString()
            })
        }
    },

    async update (req, res) {
        try {
            const id = req.param('family_id')
            const updatedFamily = await Family.updateOne({ id }).set({ ...req.body })
            res.ok(updatedFamily)
        } catch (error) {
            sails.log.error(`Error updating family`, { error, params: req.param })
            return res.serverError({
                message: `Error updating a family`,
                error: error.toString()
            })
        }
    }
};

