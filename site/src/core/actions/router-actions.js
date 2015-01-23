var dispatcher = require("../dispatcher");
var routerConstants = require("../constants/router-constants");

module.exports = {
    switchView: function (viewName, queryObject) {
        dispatcher.handleViewAction({
            actionType: routerConstants.SWITCH_VIEW,
            viewName: viewName,
            queryObject: queryObject
        });
    }
};