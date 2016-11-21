"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * InputDelegate
 * @interface
 */
var InputDelegate = function () {
  function InputDelegate() {
    _classCallCheck(this, InputDelegate);
  }

  _createClass(InputDelegate, [{
    key: "onAttached",


    /**
     * onAttached is called when the Input is attached.
     * @param {Input} input
     */
    value: function onAttached() {}

    /**
     * onInput is called when the underlying control fires an input event.
     * @param {Event} e
     */

  }, {
    key: "onInput",
    value: function onInput() {}
  }]);

  return InputDelegate;
}();

exports.default = InputDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2lucHV0L0lucHV0RGVsZWdhdGUuanMiXSwibmFtZXMiOlsiSW5wdXREZWxlZ2F0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLGE7Ozs7Ozs7OztBQUVGOzs7O2lDQUlhLENBRVo7O0FBRUQ7Ozs7Ozs7OEJBSVUsQ0FFVDs7Ozs7O2tCQUlVQSxhIiwiZmlsZSI6IklucHV0RGVsZWdhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIElucHV0RGVsZWdhdGVcbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgSW5wdXREZWxlZ2F0ZSB7XG5cbiAgICAvKipcbiAgICAgKiBvbkF0dGFjaGVkIGlzIGNhbGxlZCB3aGVuIHRoZSBJbnB1dCBpcyBhdHRhY2hlZC5cbiAgICAgKiBAcGFyYW0ge0lucHV0fSBpbnB1dFxuICAgICAqL1xuICAgIG9uQXR0YWNoZWQoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBvbklucHV0IGlzIGNhbGxlZCB3aGVuIHRoZSB1bmRlcmx5aW5nIGNvbnRyb2wgZmlyZXMgYW4gaW5wdXQgZXZlbnQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuICAgIG9uSW5wdXQoKSB7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXREZWxlZ2F0ZVxuIl19