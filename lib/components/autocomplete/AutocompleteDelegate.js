"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * AutocompleteDelegate
 * @param {Autocomplete} autocomplete
 * @abstract
 */
var AutocompleteDelegate = function () {
  function AutocompleteDelegate(autocomplete) {
    _classCallCheck(this, AutocompleteDelegate);

    this.autocomplete = autocomplete;
  }

  _createClass(AutocompleteDelegate, [{
    key: "handleKeyDown",
    value: function handleKeyDown() {}
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp() {}
  }, {
    key: "update",
    value: function update() {}

    /**
     * selected is called when an option has been clicked on
     * @param {number} index
     */

  }, {
    key: "selected",
    value: function selected(index) {}
  }]);

  return AutocompleteDelegate;
}();

exports.default = AutocompleteDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9BdXRvY29tcGxldGVEZWxlZ2F0ZS5qcyJdLCJuYW1lcyI6WyJBdXRvY29tcGxldGVEZWxlZ2F0ZSIsImF1dG9jb21wbGV0ZSIsImluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7O0lBS01BLG9CO0FBRUYsZ0NBQVlDLFlBQVosRUFBMEI7QUFBQTs7QUFFdEIsU0FBS0EsWUFBTCxHQUFvQkEsWUFBcEI7QUFFSDs7OztvQ0FFZSxDQUVmOzs7a0NBRWEsQ0FFYjs7OzZCQUVRLENBR1I7O0FBRUQ7Ozs7Ozs7NkJBSVNDLEssRUFBTyxDQUdmOzs7Ozs7a0JBSVVGLG9CIiwiZmlsZSI6IkF1dG9jb21wbGV0ZURlbGVnYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBdXRvY29tcGxldGVEZWxlZ2F0ZVxuICogQHBhcmFtIHtBdXRvY29tcGxldGV9IGF1dG9jb21wbGV0ZVxuICogQGFic3RyYWN0XG4gKi9cbmNsYXNzIEF1dG9jb21wbGV0ZURlbGVnYXRlIHtcblxuICAgIGNvbnN0cnVjdG9yKGF1dG9jb21wbGV0ZSkge1xuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlID0gYXV0b2NvbXBsZXRlO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bigpIHtcblxuICAgIH1cblxuICAgIGhhbmRsZUtleVVwKCkge1xuXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RlZCBpcyBjYWxsZWQgd2hlbiBhbiBvcHRpb24gaGFzIGJlZW4gY2xpY2tlZCBvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkKGluZGV4KSB7XG5cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGVEZWxlZ2F0ZVxuIl19