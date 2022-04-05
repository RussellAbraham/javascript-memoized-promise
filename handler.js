(function (window) {

    'use strict';

    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    window.qsa = function (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    };

    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

    window.$delegate = function (target, selector, type, handler) {
        function dispatchEvent(event) {
            var targetElement = event.target;
            var potentialElements = window.qsa(selector, target);
            var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
            if (hasMatch) {
                handler.call(targetElement, event);
            }
        }
        var useCapture = type === 'blur' || type === 'focus';
        window.$on(target, type, dispatchEvent, useCapture);
    };

    window.$parent = function (element, tagName) {
        if (!element.parentNode) {
            return;
        }
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
            return element.parentNode;
        }
        return window.$parent(element.parentNode, tagName);
    };

    NodeList.prototype.forEach = Array.prototype.forEach;

    var supportTransitions = 'webkitTransition' in document.body.style || 'transition' in document.body.style;
    var transitionEndEvent = 'webkitTransition' in document.body.style ? 'webkitTransitionEnd' : 'transitionend';
    var transitionDuration = 'webkitTransition' in document.body.style ? 'webkitTransitionDuration' : 'transitionDuration';
    
    function getElementTransitionDuration(element) {
        var duration = supportTransitions ? window.getComputedStyle(element)[transitionDuration] : 0;
        duration = parseFloat(duration);
        duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
        return duration;
    };

    function emulateTransitionEnd(element, handler) {
        var called = 0,
            duration = getElementTransitionDuration(element);
        duration ? one(element, transitionEndEvent, function (e) {
          !called && handler(e), called = 1;
        }) : setTimeout(function () {
          !called && handler(), called = 1;
        }, 17);
    };

    var Util = {
        getElementTransitionDuration: getElementTransitionDuration,
        emulateTransitionEnd: emulateTransitionEnd
    };

    window.umd = {
        Util : Util
    };

})(window);