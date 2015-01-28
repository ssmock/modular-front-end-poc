var React = require("React");
var DOM = React.DOM;
var EL = React.createElement;

var contact = React.createClass({
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
                DOM.div(null, "user-add"),
                DOM.div(null, JSON.stringify(this.state.route))
            ]);
    }
});

module.exports = contact;