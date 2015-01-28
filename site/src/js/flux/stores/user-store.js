var Constants = require("../constants/user-constants.js");
var Dispatcher = require("../dispatchers/user-dispatcher");
var EventEmitter = require('events').EventEmitter;
var _ = require("underscore");

var CHANGE_EVENT = "change";

var users = [];

//
// Define non-getters outside of our exportable object.
//

var store = merge(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    //
    // Put getter methods here.
    //
    getUsers: function () {
        return users;
    },

    dispatcherIndex: Dispatcher.register(function (payload) {
        var action = payload.action; // this is our action from handleViewAction

        switch (action.actionType) {
            case Constants.DO_EXAMPLE_THING:
                //
                // Handle it.
                //

                break;
        }

        // We might only do this conditionally.
        store.emitChange();

        return true;
    })
})

module.exports = store;