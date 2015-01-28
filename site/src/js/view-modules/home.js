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
        
        mountPoint = viewMountPoint;
        viewProps = props;

        mount();

        (callback || _.noop)();

    },

    Update: function (props, callback) {

        (callback || _.noop)();

    },

    TearDown: function (callback) {

        (callback || _.noop)();

    }
};