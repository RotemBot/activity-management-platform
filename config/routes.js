/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        view: 'pages/homepage'
    },

    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/
    /* Participants */
    'GET /participants/:participant_id': 'ParticipantController.get',
    'POST /families/:family_id/participants': 'ParticipantController.create',
    'DELETE /participants/:participant_id': 'ParticipantController.delete',
    'PATCH /participants/:participant_id': 'ParticipantController.update',

    /* Contacts */
    'GET /contacts/:contact_id': 'ContactController.get',
    'POST /families/:family_id/contacts': 'ContactController.create',
    'DELETE /families/:family_id/contacts/:contact_id': 'ContactController.delete',
    'PATCH /contacts/:contact_id': 'ContactController.update',

    /* Families */
    'GET /families/:family_id': 'FamilyController.get',
    'GET /families/find': 'FamilyController.getByEmail',
    'GET /families': 'FamilyController.getAll',
    'DELETE /families/:family_id': 'FamilyController.delete',
    'POST /families': 'FamilyController.create',
    'PATCH /families/:family_id': 'FamilyController.update',

    /* Subscriptions */
    'GET /families/:family_id/subscriptions': 'SubscriptionController.getByFamily'
};
