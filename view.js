/*global qs, qsa, $on, $parent, $delegate */

(function (window) {

	'use strict';

	function View(template) {
		Ctor.call(this);
		this.template = template;
		this.$start = qs('#btnStart');
		this.$stop = qs('#btnStop');
	};

	View.prototype = Object.create(Ctor.prototype, {
		constructor : {
			configurable : true,
			enumerable : true,
			value : View,
			writeable : true			
		}
	});
	
	View.prototype.preinitialize = function () {
		console.log(7);
	};

	View.prototype.render = function () {};

	View.prototype.bind = function (event, handler) {
		var self = this;
		if(event === 'click'){
			self.$start.addEventListener('click', function(e){
				this.disabled = true;
				self.$stop.disabled = false;
				self.start();
			},false);
			self.$stop.addEventListener('click', function(e){
				this.disabled = true;
				self.$start.disabled = false;
				self.stop();
			},false);			
		}
	};

	View.prototype.testPending = function (str) {
		
		var execute = this.template.testPending(str)
		
		.then(function(res){
			console.log(res)
		})
		
		.catch(function(er){
			console.error(er)
		})

		.then(function(){

		});
	
		return execute;

	};
	
	View.prototype.initialize = function () {
		console.log(8);

	};

	View.prototype.start = function(){
		var self = this;
		if (self.timerId) {
			console.log('@interval:'+self.timerId);
			return false;
		}
		else {
			self.timerId = setInterval(function () {
				console.log(window.main.test(Date.now()));
			}, 1000);
		}
	};

	View.prototype.stop = function(){
		if(this.timerId){
			clearInterval(this.timerId);
			this.timerId = '';
			console.log('@interval:stopped');
		}
	};	

	window.app = window.app || {};
	window.app.View = View;

}(window));