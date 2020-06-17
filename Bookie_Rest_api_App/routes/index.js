const bookRoute = require('./bookRoutes');

module.exports = function(app, data){
    bookRoute(app, data);
}