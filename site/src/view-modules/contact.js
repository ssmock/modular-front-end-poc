var _ = require("underscore");

var name = "contact";

module.exports = {
    SetUp: function (props, viewMountPoint, callback) {

        viewMountPoint.innerHTML = "<div>Contact.</div>";

        (_.noop || callback)();

    },

    TearDown: function (callback) {

        (_.noop || callback)();

    },
    Update: function (props, callback) {

        (_.noop || callback)();

    }
};