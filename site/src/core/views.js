// This looks kind of ridiculous, but the way that Webpack handles
// asynchronous requires with dynamic paths will get us into trouble.
// See http://webpack.github.io/docs/context.html.  Basically, we are
// adding another point of configuration in order to keep our lazy-
// loading agile and flexible.
var mainViews = {
    "": function (callback) {
        require.ensure(["../components/home"], function (require) {
            callback(require("../components/home"));
        });
    },
    "user": function (callback) {
        require.ensure(["../components/user"], function (require) {
            callback(require("../components/user"));
        });
    },
    "about": function (callback) {
        require.ensure(["../components/about"], function (require) {
            callback(require("../components/about"));
        });
    },
    "contact": function (callback) {
        require.ensure(["../components/contact"], function (require) {
            callback(require("../components/contact"));
        });
    },
    GetMainViewForRoute: function (route, callback) {
        mainViews[route.Segments[0]](callback);
    }
};

module.exports = mainViews;