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
    key: "onInput",


    /**
      * onInput is called when the underlying control fires an input event.
      * @param {Event} e
      */
    value: function onInput() {}
  }]);

  return InputDelegate;
}();

exports.default = InputDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2lucHV0L0lucHV0RGVsZWdhdGUuanMiXSwibmFtZXMiOlsiSW5wdXREZWxlZ2F0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLGE7Ozs7Ozs7OztBQUVIOzs7OzhCQUlXLENBRVQ7Ozs7OztrQkFJVUEsYSIsImZpbGUiOiJJbnB1dERlbGVnYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBJbnB1dERlbGVnYXRlXG4gKiBAaW50ZXJmYWNlXG4gKi9cbmNsYXNzIElucHV0RGVsZWdhdGUge1xuXG4gICAvKipcbiAgICAgKiBvbklucHV0IGlzIGNhbGxlZCB3aGVuIHRoZSB1bmRlcmx5aW5nIGNvbnRyb2wgZmlyZXMgYW4gaW5wdXQgZXZlbnQuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZVxuICAgICAqL1xuICAgIG9uSW5wdXQoKSB7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5wdXREZWxlZ2F0ZVxuIl19