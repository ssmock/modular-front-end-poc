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
    defaultView = initialView;

    React.render(
        EL(main, {
            initialRoute: initialRoute,
            initialView: initialView
        }),
        document.getElementById("main-view-box"));
});