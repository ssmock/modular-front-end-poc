var _ = require("underscore");
var React = require("React");

var DetailView = require("../flux/components/user-add");
var AddView = require("../flux/components/user-detail");
var ListView = require("../flux/components/user-list");

var DOM = React.DOM;
var EL = React.createElement;

var name = "user"; // Just for debugging
var mountPoint = null;

function endsWithNumber(arr) {
    return !isNaN(parseInt(_.last(arr)));
}

function getView(route) {
    if (route.Segments.length === 2)
    {
        if (endsWithNumber(route.Segments)) {
            return DetailView;
        }
        else {
            return AddView;
        }
    }
    else {
        return ListView;
    }
}

var user = React.createClass({
    getInitialState: function () {
        console.log("+++++++++ user get initial");

        return {
            Route: this.props.Route
        };
    },

    componentWillReceiveProps: function (newProps) {
        console.log("+++++++++ user will receive props");

        this.setState({
            Route: newProps.Route,
            Users: []
        });
    },
    
    componentWillUnmount: function () {
        console.log("+++++++++ user will unmount");
    },

    render: function () {
        var view;
        var route = this.state.Route;

        console.log("+++++++++ user will render");
        
        // Determine the view mode: list, detail, or add.  This
        // depends on the route.
        var view = getView(route);
        
        return view;
    }
});

module.exports = {
    SetUp: function (props, viewMountPoint, callback) {
        
        mountPoint = viewMountPoint;

        React.render(
            EL(user, props),
            mountPoint);

        (callback || _.noop)();

    },

    Update: function (props, callback) {

        React.render(
            EL(user, props),
            mountPoint);

        (callback || _.noop)();

    },

    TearDown: function (callback) {

        React.unmountComponentAtNode(mountPoint);

        (callback || _.noop)();

    }
};