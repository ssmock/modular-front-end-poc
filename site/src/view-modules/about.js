var _ = require("underscore");

var name = "about";

module.exports = {
    SetUp: function (props, viewMountPoint, callback) {
        
        viewMountPoint.innerHTML = "<div>ABOUT!</div>";

        (_.noop || callback)();

    },

    TearDown: function (callback) {

        (_.noop || callback)();

    },
    Update: function (props, callback) {

        (_.noop || callback)();

    }
};