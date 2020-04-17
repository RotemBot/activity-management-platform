/**
 * SubscriptionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async getByFamily (req, res) {
        try {
            const family = await Family.findOne({ id: req.param('family_id')})
                .populate('children')
            if (!family) {
                throw new Error('No family matches given ID')
            }
            const subscriptions = []
            for (let child of family.children) {
                const subs = await Subscription.find({ subscriber: child.id })
                subscriptions.concat(subs)
            }
            res.ok(subscriptions)
        } catch (error) {
            sails.log.error(`Error fetching family`, { params: req.param() })
            return res.serverError({
                message: `Error fetching family's details - ID ${req.param('family_id')}`,
                error: error.toString()
            })
        }
    },

};

