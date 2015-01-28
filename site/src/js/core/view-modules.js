/**
 * About the Require functions, below:
 *
 * It looks like we refactor these out, but the way that Webpack handles
 * asynchronous requires with dynamic paths will get us into trouble.
 * See http://webpack.github.io/docs/context.html.  Basically, we are
 * adding another point of configuration in order to keep our lazy-
 * loading agile and flexible.
 */

/**
 * About the module members:
 *
 * This is pure convention, and a little unsafe, in consequence.  The rule
 * is: members that are not functions are assumed to be route branches.  For
 * further explanation, see how it's used in core/router.js.
 *
 * This convention also applies to the viewModules object itself!
 */

var viewModules = {
    "": {
        Require: function (callback) {
            require.ensure(["../view-modules/home"], function (require) {
                callback(require("../view-modules/home"));
            });
        }
    },
    "user": {
        Require: function (callback) {
            require.ensure(["../view-modules/user"], function (require) {
                callback(require("../view-modules/user"));
            });
        },
        // Subroutes - see core/router.js
        ":id": null
    },
    "about": {
        Require: function (callback) {
            require.ensure(["../view-modules/about"], function (require) {
                callback(require("../view-modules/about"));
            });
        }
    },
    "contact": {
        Require: function (callback) {
            require.ensure(["../view-modules/contact"], function (require) {
                callback(require("../view-modules/contact"));
            });
        }
    },
    GetByRoute: function (route, callback) {
        viewModules[route.Segments[0]].Require(callback);
    }
};

module.exports = viewModules;