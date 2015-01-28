var BaseDispatcher = require("./base-dispatcher");
var _ = require("underscore");

var appDispatcher = merge(BaseDispatcher.prototype, {
    handleViewAction: function (action) {
        this.dispatch({
            source: "VIEW_ACTION",
            action: action
        });
    },
});

module.exports = appDispatcher;