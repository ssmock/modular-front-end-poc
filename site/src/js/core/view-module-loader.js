/*
 * This commits us to React.  It would be better
 * to push it down one more level -- each item in
 * views should be able to be a different thing,
 * i.e. they don't all need to be React.
 *
 * All of which is to say: this is unused, but
 * kept for posterity.
 */

var Router = require("./router");
var ViewModules = require("./view-modules");

var mountPoint = document.getElementById("main-view-box");
var currentRoute = Router.GetCurrentRoute();

var defaultViewModule = null;
var currentViewModule = null;

function getViewProps(route) {
    return {
        Route: route
    };
}

function loadViewModuleForRoute(viewModule, route) {
    var props = getViewProps(route);

    if (viewModule === currentViewModule) {
        currentViewModule.Update(props, function () {
            console.log("**** Update", currentViewModule);
        });
    }
    else {
        if (currentViewModule) {
            currentViewModule.TearDown(function () {
                console.log("**** Tear down", currentViewModule);
            });
        }

        currentViewModule = viewModule;

        currentViewModule.SetUp(
            props,
            mountPoint,
            function () {
                console.log("**** Set up", currentViewModule);
            });
    }
}

Router.addChangeListener(function (newRoute) {
    currentRoute = newRoute;

    ViewModules.GetByRoute(currentRoute, function (viewModule) {
        loadViewModuleForRoute(viewModule, newRoute);
    });
});

// Load the initial one.
ViewModules.GetByRoute(currentRoute, function (viewModule) {
    defaultView = viewModule; // In case view-getting fails at a later time.

    loadViewModuleForRoute(viewModule, currentRoute);
});

// (No export.  This is essentially an entry point.)