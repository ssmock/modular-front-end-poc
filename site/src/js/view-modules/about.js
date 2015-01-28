var _ = require("underscore");

var name = "about";

module.exports = {
    SetUp: function (props, viewMountPoint, callback) {
        
        viewMountPoint.innerHTML = "<div>ABOUT!</div>";

        (callback || _.noop)();

    },

    Update: function (props, callback) {

        (callback || _.noop)();

    },

    TearDown: function (callback) {

        (callback || _.noop)();

    }
};