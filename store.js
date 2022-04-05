(function (window) {

	'use strict';

	function Store(name) {
		Ctor.call(this);
		this._dbName = name;
	};

	Store.prototype = Object.create(Ctor.prototype, {
		constructor : {
			value : Store,
			writeable : true,
			configurable : true,
			enumerable : true
		}
	});
	
	Store.prototype = {
        get name(){
            return this._dbName;
        },
        set name(x){
            this._dbName = x;
        }
    };
    	
	Store.prototype.preinitialize = function () {
		console.log(1);
	};

	Store.prototype.testPending = function (str) {
		return new Promise(function(resolve, reject){
			if(str){
				resolve('Store : '+str);
			}
			else {
				reject('not enough arguments');
			}
		});
	};

	Store.prototype.initialize = function () {
		console.log(2);
	};
	
	window.app = window.app || {};
	window.app.Store = Store;
	
})(window);