var bookshelf = require('../config/bookshelf');
var ModelBase = require('bookshelf-modelbase')(bookshelf);

module.exports = (function() {
  return bookshelf.model('ProfileImage', ModelBase.extend({
    tableName: 'profileImages',
    user: function() {
      return this.belongsTo('User', 'user_id');
    }
  }));
})();