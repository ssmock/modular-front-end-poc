var baseDispatcher = require("./base-dispatcher");
var merge = require("react/lib/merge");

function actionHandler(target, source) {
    return function (action) {
        console.log("Handling for " + source, action);

        target.dispatch({
            source: source,
            action: action
        });
    }
}

var handlers = {
    handleRouteAction: actionHandler(this, "ROUTE_ACTION"),
    handleViewAction: actionHandler(this, "VIEW_ACTION")
};

var appDispatcher = merge(baseDispatcher.prototype, handlers);

module.exports = appDispatcher;