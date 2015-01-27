var Router = require("director").Router;
var Merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var QueryString = require("query-string");
var _ = require("underscore");

// We delegate change event emission to this service,
// rather than exposing our router directly.  Look
// for its .emit() calls below.
var service;
var CHANGE_EVENT = "change"; // We need an event name.

var service = Merge(EventEmitter.prototype, {
    // Adds a listener for the route change event, which
    // can accept a RouteChangeMessage.
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// We don't want to expose this, since only our route
// handler below will be calling it.  Consumers should
// only be able to add and remove listeners.
function emitChange(routeChangeMessage) {
    service.emit(CHANGE_EVENT, routeChangeMessage);
}

// Our message type.
var RouteChangeMessage = function (segments, queryValues) {
    this.Segments = segments;
    this.QueryValues = queryValues;
};

// Include the message type on the service itself.  (This
// will allow consumers to access it as a type.)
service.RouteChangeMessage = RouteChangeMessage;

// Gets an object containing query values from the specified route,
// regardless of whether it's expressed as an array or a string.
function getQueryValues(route) {
    // Handle an array or a string.
    route = route instanceof Array ? _.last(route) : route;

    // Try to extract the query string.
    var matches = route.match(/(\?.+)/);

    // If we got matches, grab the first one, and skip the first character.
    if (matches) {
        return QueryString.parse(matches[0].slice(1));
    }

    return null;
};

// Factory function for more easily creating RouteChangeMessages
// from Director.Router.getRoute() arrays.
function makeRouteChangeMessage() {
    var route = router.getRoute();
    var lastIndex = route.length - 1;

    var queryValues = getQueryValues(route);

    // Remove the query string from our last route segment.
    route[lastIndex] = route[lastIndex].split("?")[0];

    return new RouteChangeMessage(route, queryValues)
}

// Give the service a getter so that this stuff can be retrieved 
// on - demand, too.
service.GetCurrentRoute = function () {
    return makeRouteChangeMessage();
};

// Create our Director.Router routing table.  We don't export
// any of this stuff, but must be sure to call the router.init()
// method.

// Our sole route-change handler: just emits a message indicating
// the current route.
function routeHandler (){
    emitChange(makeRouteChangeMessage());
}

var routes = {
    "/user": {
        on: routeHandler,
        "/:id": routeHandler
    },
    "/about": {
        on: routeHandler
    },
    "/contact": {
        on: routeHandler
    },
    "/": {
        on: routeHandler
    }
};

var router = Router(routes);

router.notfound = function () {
    emitChange(new RouteChangeMessage(null, null));
};

router.init();

// If we have no route, set it to the empty route.
// Difference: the empty route gets handled as "/",
// while no-route does not.
if (!router.getRoute()[0]) {
    router.setRoute("");
}

module.exports = service;