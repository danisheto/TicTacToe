// A generic observable subject class that is useful in model creation.
var makeObservableSubject = function() {
    var observers = [];
    
    var addObserver = function(o) {
        if (typeof o !== 'function') {
            throw new Error('observer must be a function');
        }
        for (var i=0, ilen=observers.length; i<ilen; i++) {
            var observer = observers[i];
            if (observer === o) {
                throw new Error('observer already in the list');
            }
        }
        observers.push(o);
    };
    
    var removeObserver = function(o) {
        for (var i=0, ilen=observers.length; i<ilen; i++) {
            var observer = observers[i];
            if (observer === o) {
                observers.splice(i, 1);
                return;
            }
        }
        throw new Error('could not find observer in list of observers');
    };
    
    var notifyObservers = function(data) {
        // Make a copy of observer list in case the list
        // is mutated during the notifications.
        var observersSnapshot = observers.slice(0);
        for (var i=0, ilen=observersSnapshot.length; i<ilen; i++) {
            observersSnapshot[i](data);
        }
    };
    
    return {
        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers
    };
};