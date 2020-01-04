/**
 * @typedef Tournament
 * @property {string} name.required - match's location
 * @property {string} type.required - tournament id
 * @property {string} endDate.required - visitior team id
 * @property {string} startDate.required - local team id
 * @property {array} clasification.required - match date
 */
/**
 * This function comment is parsed by doctrine
 * @route GET /tournaments
 * @group Tournaments - Operations about user
 * @headers {string} 200.X-Expires-After - 	date in UTC when token expires
 * @returns {object} 200 - An array of user info
 * @security JWT
 * @returns {Error}  default - Unexpected error
 */
