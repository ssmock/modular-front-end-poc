var Router = require("./router");
var React = require("React");

console.log("Started main.");
console.log("--- Router: ", Router);
//console.log("--- View Service: ", viewService);
console.log("--- React: ", React);

Router.addChangeListener(function (message) {
    console.log("Got it!", message);
});

var initialRoute = Router.GetCurrentRoute();

console.log("Initial route: ", initialRoute);

//getInitialState: function () {
//    return getCart();
//},
//componentWillMount: function() {            
//    store.addChangeListener(this.onStoreChange);
//},
//onStoreChange: function() {
//    this.setState(getCart());
//},