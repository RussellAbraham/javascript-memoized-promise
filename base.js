/*base*/
(function (factory) {

	var root = this;

	root.Base = factory(root, {
		Aria: function () {},
		Debug: function () {}
	});

})(function (root, Base) {

	var reference = root.Base;

	Base.VERSION = '0.0.1';

	Base.noConflict = function () {
		root.Base = reference;
		return this;
	};

	function assign(keysCallback, undefinedOnly) {
		return function (object) {
			var length = arguments.length,
				index, i;
			if (length < 2 || object == null) return object;
			for (index = 1; index < length; index++) {
				var source = arguments[index];
				var keys = keysCallback(source),
					l = keys.length;
				for (i = 0; i < l; i++) {
					var key = keys[i];
					if (!undefinedOnly || object[key] === void 0) object[key] = source[key];
				}
			}
			return object;
		}
	}

	function names(obj) {
		var result = [];
		for (var key in obj) {
			result.push(key);
		}
		return result;
	};

	Base.extend = assign(names);

	Base.inherits = function (protoProps, staticProps) {
		var parent = this;
		var child;
		if (protoProps != null && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function () {
				return parent.apply(this, arguments);
			};
		}
		Base.extend(child, parent, staticProps);
		child.prototype = Object.create(parent.prototype, protoProps);
		child.prototype.constructor = child;
		child.__super__ = parent.prototype;
		return child;
	};

	return Base;
});
