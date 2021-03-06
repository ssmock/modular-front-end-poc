﻿/*
 * This commits us to React.  It would be better
 * to push it down one more level -- each item in
 * views should be able to be a different thing,
 * i.e. they don't all need to be React.
 *
 * All of which is to say: this is unused, but
 * kept for posterity.
 */

var Router = require("./router");
var Views = require("./views");
var React = require("React");

var DOM = React.DOM;
var EL = React.createElement;
var defaultView = null;

var main = React.createClass({
    getInitialState: function () {
        return {
            route: this.props.initialRoute,
            currentView: this.props.initialView
        };
    },

    componentWillMount: function () {
        Router.addChangeListener(this.routeChanged);
    },

    routeChanged: function (newRoute) {
        var self = this;

        Views.GetMainViewForRoute(newRoute, function (mainView) {
            self.setState({
                route: newRoute,
                currentView: mainView
            });
        });
    },

    render: function () {
        var view =
            this.state.currentView
            ? EL(this.state.currentView, {
                route: this.state.route
            })
            : defaultView;

        return view
    }
});

var initialRoute = Router.GetCurrentRoute();

Views.GetMainViewForRoute(initialRoute, function (initialView) {
    defaultView = initialView; // In case view-getting fails.

    React.render(
        EL(main, {
            initialRoute: initialRoute,
            initialView: initialView
        }),
        document.getElementById("main-view-box"));
});