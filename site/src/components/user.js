var React = require("React");
var _ = require("underscore");

var DOM = React.DOM;
var EL = React.createElement;

var user = React.createClass({
    getInitialState: function () {
        return {
            route: this.props.route
        };
    },

    componentWillReceiveProps: function (newProps) {
        this.setState({
            route: newProps.route
        });
    },

    render: function () {
        return DOM.div(null,
            [
                DOM.div(null, "USER!"),
                DOM.div(null, JSON.stringify(this.state.route))
            ]);
    }
});

module.exports = user;