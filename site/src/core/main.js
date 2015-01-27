var Router = require("./router");
var React = require("React");
var DOM = React.DOM;
var EL = React.createElement;

//var mainViews = {
//    "": home,
//    "user": user,
//    "about": about,
//    "contact": contact
//};

function getMainViewForRoute(route, callback) {
    //
    // TODO: We need to async this... hmm...
    // BIG QUESTION:
    //     When, and how, do we load components asynchronously??
    //
    var componentPath = "../components/" + route.Route[0];

    require.ensure([componentPath], function (deps) {
        callback(deps[componentPath]);
    });
}

var main = React.createClass({
    getInitialState: function () {
        return {
            route: Router.GetCurrentRoute(),
            currentMainView: null
        };
    },

    componentWillMount: function () {
        Router.addChangeListener(this.routeChanged);
    },

    routeChanged: function (newRoute) {
        getMainViewForRoute(newRoute, function (mainView) {
            this.setState({
                route: newRoute,
                currentMainView: mainView
            });
        });
    },

    render: function () {
        viewType = getMainViewForRoute(this.state.route);

        var view = DOM.div({}, "");

        if (this.state.currentMainView) {
            DOM.div(null,
                [
                    EL(this.state.currentMainView, {
                        route: this.state.route
                    })
                ]);
        }
        //else {
        //    // Just use the default.
        //}

        return view;
    }
});

var componentPath = "../components/about.js";

require.ensure([], function () {
    var component = require(componentPath);
    console.log("called back: ", component);
    //callback(deps[componentPath]);
});

//React.render(
//    //EL(main),
//    document.getElementById("main-view-box"),
//    function () {
//        //
//        // Any old thing.
//        //
//    });