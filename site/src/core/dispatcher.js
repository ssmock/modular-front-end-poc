var baseDispatcher = require("./base-dispatcher");
var constants = require("./constants/dispatcher-constants");
var merge = require("react/lib/merge");

var appDispatcher = merge(baseDispatcher.prototype, {
    handleViewAction: function (action) {
        this.dispatch({
            source: constants.VIEW_ACTION,
            action: action
        });
    },
});

module.exports = appDispatcher;