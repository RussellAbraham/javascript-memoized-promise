
(function () {

	'use strict';
	
	function Base(){

	};

	Base.prototype.valueOf = function(){
		return this;
	};

	function Main(name) {		
		this.preinitialize.apply(this,arguments);
		this.storage = new app.Store(name);		
		this.model = new app.Model(this.storage);		
		this.template = new app.Template();
		this.view = new app.View(this.template);		
		this.controller = new app.Controller(this.model, this.view);
		this.initialize.apply(this,arguments);
	}

	Main.prototype = Object.create(Base.prototype, {
		constructor : {
			configurable : true,
			enumerable : true,
			value : Main,
			writeable : true
		}
	});

	Main.prototype.preinitialize = function(){
		console.log('BEGIN');
	}
	
	Main.prototype.test = function(){
		this.controller.test(arguments[0]);
	}

	Main.prototype.initialize = function(){
		console.log('END');
	}	

	window.main = new Main('Sandbox');

	function setView() {

	}

	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);

})();
