
/**
 * Checks if a user has admin privileges.
 * 
 *  @param {Object} user - An object representing the user to be checked.
 *  @returns {boolean} A boolean value indicating if the user has admin privileges or not.
 */
const isAdmin = (user) => {
   if (user.admin !== true) return false;;
   return true;
}

module.exports = isAdmin;