'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SelectionDelegate for the searching phase.
 */
var SelectionDelegate = function (_AutocompleteDelegate) {
    _inherits(SelectionDelegate, _AutocompleteDelegate);

    function SelectionDelegate() {
        _classCallCheck(this, SelectionDelegate);

        return _possibleConstructorReturn(this, (SelectionDelegate.__proto__ || Object.getPrototypeOf(SelectionDelegate)).apply(this, arguments));
    }

    _createClass(SelectionDelegate, [{
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) this.autocomplete.toRest();
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            if (e.keyCode !== 27) this.autocomplete.toSearch();
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            throw new ReferenceError('SelectionDelegate: does not support selecting!');
        }
    }, {
        key: 'render',
        value: function render() {

            var options = this.autocomplete.view.findById('options');

            while (options.lastChild) {
                options.removeChild(options.lastChild);
            }options.classList.toggle(Class.WAT_VISIBLE);
        }
    }]);

    return SelectionDelegate;
}(_AutocompleteDelegate3.default);

exports.default = SelectionDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9TZWxlY3Rpb25EZWxlZ2F0ZS5qcyJdLCJuYW1lcyI6WyJDbGFzcyIsIlNlbGVjdGlvbkRlbGVnYXRlIiwiZSIsImtleUNvZGUiLCJhdXRvY29tcGxldGUiLCJ0b1Jlc3QiLCJ0b1NlYXJjaCIsImluZGV4IiwiUmVmZXJlbmNlRXJyb3IiLCJvcHRpb25zIiwidmlldyIsImZpbmRCeUlkIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJXQVRfVklTSUJMRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsSzs7QUFDWjs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01DLGlCOzs7Ozs7Ozs7OztvQ0FFVUMsQyxFQUFHOztBQUVYLGdCQUFJQSxFQUFFQyxPQUFGLEtBQWMsRUFBbEIsRUFDSSxLQUFLQyxZQUFMLENBQWtCQyxNQUFsQjtBQUVQOzs7c0NBRWFILEMsRUFBRzs7QUFFYixnQkFBSUEsRUFBRUMsT0FBRixLQUFjLEVBQWxCLEVBQ0ksS0FBS0MsWUFBTCxDQUFrQkUsUUFBbEI7QUFFUDs7QUFFRDs7Ozs7OztpQ0FJU0MsSyxFQUFPOztBQUVaLGtCQUFNLElBQUlDLGNBQUosQ0FBbUIsZ0RBQW5CLENBQU47QUFFSDs7O2lDQUVROztBQUVMLGdCQUFJQyxVQUFVLEtBQUtMLFlBQUwsQ0FBa0JNLElBQWxCLENBQXVCQyxRQUF2QixDQUFnQyxTQUFoQyxDQUFkOztBQUVBLG1CQUFPRixRQUFRRyxTQUFmO0FBQ0lILHdCQUFRSSxXQUFSLENBQW9CSixRQUFRRyxTQUE1QjtBQURKLGFBR0FILFFBQVFLLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCZixNQUFNZ0IsV0FBL0I7QUFFSDs7Ozs7O2tCQUlVZixpQiIsImZpbGUiOiJTZWxlY3Rpb25EZWxlZ2F0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5pbXBvcnQgQXV0b2NvbXBsZXRlRGVsZWdhdGUgZnJvbSAnLi9BdXRvY29tcGxldGVEZWxlZ2F0ZSc7XG5cbi8qKlxuICogU2VsZWN0aW9uRGVsZWdhdGUgZm9yIHRoZSBzZWFyY2hpbmcgcGhhc2UuXG4gKi9cbmNsYXNzIFNlbGVjdGlvbkRlbGVnYXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlRGVsZWdhdGUge1xuXG4gICAgaGFuZGxlS2V5VXAoZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KVxuICAgICAgICAgICAgdGhpcy5hdXRvY29tcGxldGUudG9SZXN0KCk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAyNylcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VhcmNoKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZWxlY3RlZCBpcyBjYWxsZWQgd2hlbiBhbiBvcHRpb24gaGFzIGJlZW4gY2xpY2tlZCBvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkKGluZGV4KSB7XG5cbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdTZWxlY3Rpb25EZWxlZ2F0ZTogZG9lcyBub3Qgc3VwcG9ydCBzZWxlY3RpbmchJyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZS52aWV3LmZpbmRCeUlkKCdvcHRpb25zJyk7XG5cbiAgICAgICAgd2hpbGUgKG9wdGlvbnMubGFzdENoaWxkKVxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVDaGlsZChvcHRpb25zLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLldBVF9WSVNJQkxFKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Rpb25EZWxlZ2F0ZVxuIl19