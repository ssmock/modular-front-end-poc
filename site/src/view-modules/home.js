var _ = require("underscore");

var name = "home";
var mountPoint = null;
var viewProps = null;

function getHtml() {
    return "<div>Welcome homie</div>" 
        + "<div>" + JSON.stringify(viewProps) + "</div>";
}

function mount() {
    if (mountPoint) {
        mountPoint.innerHTML = getHtml();
    }
}

module.exports = {
    SetUp: function (props, viewMountPoint, callback) {

        console.log("Set up " + name, props, viewMountPoint, callback);

        mountPoint = viewMountPoint;
        viewProps = props;

        mount();

        (_.noop || callback)();

    },

    TearDown: function (callback) {

        console.log("Tear down " + name);

        (_.noop || callback)();

    },
    Update: function (props, callback) {

        console.log("Update " + name, props);

        mount();

        (_.noop || callback)();

    }
};