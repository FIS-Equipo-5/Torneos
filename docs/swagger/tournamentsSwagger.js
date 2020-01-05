/**
 * @typedef Tournament
 * @property {string} name.required - match's location
 * @property {string} type.required - tournament id
 * @property {string} endDate.required - visitior team id
 * @property {string} startDate.required - local team id
 * @property {array.<object>} clasification.required - match date
 */
/**
 * @route GET /tournaments
 * @group Tournaments - Operations about user
 * @returns {Array.<Tournament>} 200 - An array of Tournaments info
 * @security JWT
 */

 /**
 * @route GET /tournament/{tournament_id}
 * @group Tournaments - Operations about user
 * @param {string} tournament_id.path.required
 * @returns {Tournament.model} 200 - Tournament info
 * @security JWT
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Internal Error
 */



  /**
 * This function comment is parsed by doctrine
 * @route POST /tournament/
 * @group Tournaments - Operations about user
 * @param {Tournament.model} tournament.body.required
 * @returns {Tournament.model} 201 - Tournament created info
 * @security JWT
 * @returns {Error}  404 - Not Found
 * @returns {Error}  409 - Conflict
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Internal Error
 */

  /**
 * @route PUT /tournament/{tournament_id}
 * @group Tournaments - Operations about user
 * @param {string} tournament_id.path.required
 * @param {Tournament.model} tournament.body.required
 * @returns {Tournament.model} 200 - Tournament info
 * @security JWT
 * @returns {Error}  404 - Not Found
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Internal Error
 */


/**
 * @route DELETE /tournament/{tournament_id}
 * @group Tournaments - Operations about user
 * @param {string} tournament_id.path.required
 * @returns {Tournament.model} 200 - Deleted
 * @security JWT
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Internal Error
 */

/**
 * @route PUT /tournament/initialize/{tournament_id}
 * @group Tournaments - Operations about user
 * @param {string} tournament_id.path.required
 * @param {array.<integer>} teams_ids.body.required
 * @returns {Tournament.model} 200 - Deleted
 * @security JWT
 * @returns {Error}  404 - Not Found
 * @returns {Error}  500 - Internal Error
 */


