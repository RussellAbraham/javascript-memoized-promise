(function (window) {
	
	'use strict';
	
	function Controller(model, view) {
		Ctor.call(this, arguments);
		var self = this;
		self.model = model;
		self.view = view;
		self.view.bind('click', function(){
			
		})
	};
	
	Controller.prototype = Object.create(Ctor.prototype, {
		constructor : {
			configurable : true,
			enumerable : true,
			value : Controller,
			writeable : true
		}
	});
	
	Controller.prototype.preinitialize = function () {
		console.log(9);
	};	
	
	Controller.prototype.setView = function () {

	};
	
	Controller.prototype.test = function(str){
		
		var self = this;
		
		var memo = _.memoize(function(){
			return {
				model : self.model.testPending(str),
				view : self.view.testPending(str)
			}
		})
		
		console.log(memo.prototype);

		memo();
	}

	Controller.prototype.initialize = function () {
		console.log(10)
	};
	
	window.app = window.app || {};
	window.app.Controller = Controller;

})(window);
