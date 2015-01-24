var getQuery = require("../util/get-query");
var routerActions = require("./actions/router-actions");
var director = require("director");

var Router = director.Router;

var routes = {
    "/user": {
        on: function () {
            var query = getQuery(router.getRoute());

            routerActions.switchView("user", query);
        },
        once: function () {
            console.log("first time user list");
        },
        "/:id": {
            on: function (id) {
                console.log("just user " + id);
            },
            once: function (id) {
                console.log("first time for user " + id);
            }
        }
    },
    "/about": {
        on: function () {
            var query = getQuery(router.getRoute());

            routerActions.switchView("about", query);
        },
        once: function () {
            console.log("first time about");
        }
    },
    "/contact": {
        on: function () {
            var query = getQuery(router.getRoute());

            routerActions.switchView("contact", query);
        },
        once: function () {
            console.log("first time contact");
        }
    }
    // TODO
    //,
    //"/": {
    //    on: function () {
    //        console.log("ummm...");
    //    },
    //    once: function () {
    //        console.log("first time NUTHIN!");
    //    }
    //}
};

var router = Router(routes);

// TODO
//router.notfound = function () {
//    console.log("Not found!");
//};

router.init();

if (!router.getRoute()[0]) {
    router.setRoute("");
}