var _ = require("underscore");
var React = require("React");

var DOM = React.DOM;
var EL = React.createElement;

var name = "user"; // Just for debugging
var mountPoint = null;

var user = React.createClass({
    getInitialState: function () {
        return {
            Route: this.props.Route
        };
    },

    componentWillReceiveProps: function (newProps) {
        this.setState({
            Route: newProps.Route
        });
    },
    
    render: function () {
        return DOM.div(null,
            [
                DOM.div(null, "USER!"),
                DOM.div(null, JSON.stringify(this.state.Route))
            ]);
    }
});

module.exports = {
    SetUp: function (props, viewMountPoint, callback) {
        
        mountPoint = viewMountPoint;

        React.render(
            EL(user, props),
            mountPoint);

        (_.noop || callback)();

    },

    TearDown: function (callback) {

        (_.noop || callback)();

    },
    Update: function (props, callback) {

        React.render(
            EL(user, props),
            mountPoint);

        (_.noop || callback)();

    }
};