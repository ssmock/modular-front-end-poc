var dispatcher = require('./dispatcher');
var dispatcherConstants = require('./constants/dispatcher-constants');
var routerConstants = require('./constants/router-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var service;
var CHANGE_EVENT = "change";

/*
 * SERVICE DEFINITION
 */
var service = merge(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    currentViewName: "",
    currentQuery: null,

    dispatcherIndex: dispatcher.register(function (payload) {
        if (payload.source === dispatcherConstants.ROUTE_ACTION) {

            var action = payload.action;
                        
            if (action.actionType === routerConstants.SWITCH_VIEW) {
                console.log("Switching views...", action);

                service.currentViewName = action.viewName;
                service.currentQuery = action.queryObject;
            }            

            console.log("Emitting change...", action);
            service.emitChange();
        }

        return true;
    })
});

module.exports = service;