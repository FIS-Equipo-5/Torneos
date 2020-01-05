/**
 * @typedef Goal
 * @property {string} player - player id
 * @property {enum} type - Type of scored goal - eg: free-kick, penalty-kick, goal-kick
 * @property {number} time - time -eg: 14, 37 or 94
 */
/**
 * @typedef Card
 * @property {string} player - player id
 * @property {enum} type - Type of card - eg: Red, Yellow
 * @property {number} time - time -eg: 14, 37 or 94
 */
/**
 * @typedef Stats
 * @property {number} localScore - tournament id
 * @property {number} visitorScore - visitior team id
 * @property {Array.<Goal>} goals - local team id
 * @property {Array.<Card>} cards - match date
 */
/**
 * @typedef Weather
 * @property {string} dt_txt - day and hour
 * @property {[string]} weather - description": "clear sky", "icon": "01n"
 */

/**
 * @typedef Match
 * @property {string} location.required - match's location
 * @property {string} tournamentUuid.required - tournament id
 * @property {string} visitorTeamUuid.required - visitior team id
 * @property {string} localTeamUuid.required - local team id
 * @property {date} matchDate.required - match date
 * @property {Stats.model} stats - match stats
 * @property {Weather.model} weather - weather 
 */
/**
* This function retrieve a complete list of matches
* @route GET /matches
* @group Matches - Operations about Match
* @returns {object} 200 - An array with all the matches
* @returns {Error}  404 - Not Found
* @returns {Error}  default - Unexpected error
 * @security JWT
*/
/**
* This function retrieve a complete list of matches
* @route GET /matches/{tournament_id}
* @group Matches - Operations about Match
* @param {string} tournament_id.path.required
* @returns {object} 200 - An array with all the matches that belongs to the expecified tournament
* @returns {Error}  404 - Not Found
* @returns {Error}  default - Unexpected error
* @security JWT
*/
/**
* This function comment is parsed by doctrine
* @route GET /match/{match_id}
* @group Matches - Operations about user
* @param {string} match_id.path.required
* @returns {object} 200 - the selected match
* @returns {Error}  default - Unexpected error
* @returns {Error}  404 - Not Found
* @security JWT
*/
/**
* This function updates the expecified match
* @route PUT /match/{match_id}
* @group Matches - Operations about Match
* @param {string} match_id.path.required
* @returns {object} 200 - match updated
* @returns {Error}  default - Unexpected error
*/
/**
* This function deletes the expecified match
* @route DELETE /match/{match_id}
* @group Matches - Operations about Match
* @param {string} match_id.path.required
* @returns {object} 200 - Deleted match
* @returns {Error}  404 - Not Found
* @returns {Error}  default - Unexpected error
* @security JWT
*/