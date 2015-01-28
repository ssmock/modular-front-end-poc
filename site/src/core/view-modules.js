// This looks kind of ridiculous, but the way that Webpack handles
// asynchronous requires with dynamic paths will get us into trouble.
// See http://webpack.github.io/docs/context.html.  Basically, we are
// adding another point of configuration in order to keep our lazy-
// loading agile and flexible.
var viewModules = {
    "": function (callback) {
        require.ensure(["../view-modules/home"], function (require) {
            callback(require("../view-modules/home"));
        });
    },
    "user": function (callback) {
        require.ensure(["../view-modules/user"], function (require) {
            callback(require("../view-modules/user"));
        });
    },
    "about": function (callback) {
        require.ensure(["../view-modules/about"], function (require) {
            callback(require("../view-modules/about"));
        });
    },
    "contact": function (callback) {
        require.ensure(["../view-modules/contact"], function (require) {
            callback(require("../view-modules/contact"));
        });
    },
    GetByRoute: function (route, callback) {
        viewModules[route.Segments[0]](callback);
    }
};

module.exports = viewModules;