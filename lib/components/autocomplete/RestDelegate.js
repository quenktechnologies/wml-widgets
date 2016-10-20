'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
 * RestDelegate is used when the autocomplete is not doing anything special.
 * It may have focus but that's it.
 */
var RestDelegate = function (_AutocompleteDelegate) {
    _inherits(RestDelegate, _AutocompleteDelegate);

    function RestDelegate() {
        _classCallCheck(this, RestDelegate);

        return _possibleConstructorReturn(this, (RestDelegate.__proto__ || Object.getPrototypeOf(RestDelegate)).apply(this, arguments));
    }

    _createClass(RestDelegate, [{
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) e.target.blur();
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            if (e.keyCode !== 27) this.autocomplete.toSearch();
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

    return RestDelegate;
}(_AutocompleteDelegate3.default);

exports.default = RestDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9SZXN0RGVsZWdhdGUuanMiXSwibmFtZXMiOlsiQ2xhc3MiLCJSZXN0RGVsZWdhdGUiLCJlIiwia2V5Q29kZSIsInRhcmdldCIsImJsdXIiLCJhdXRvY29tcGxldGUiLCJ0b1NlYXJjaCIsIm9wdGlvbnMiLCJ2aWV3IiwiZmluZEJ5SWQiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIldBVF9WSVNJQkxFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUFZQSxLOztBQUNaOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0lBSU1DLFk7Ozs7Ozs7Ozs7O29DQUVVQyxDLEVBQUc7O0FBRVgsZ0JBQUlBLEVBQUVDLE9BQUYsS0FBYyxFQUFsQixFQUNJRCxFQUFFRSxNQUFGLENBQVNDLElBQVQ7QUFFUDs7O3NDQUVhSCxDLEVBQUc7O0FBRWIsZ0JBQUlBLEVBQUVDLE9BQUYsS0FBYyxFQUFsQixFQUNJLEtBQUtHLFlBQUwsQ0FBa0JDLFFBQWxCO0FBRVA7OztpQ0FFUTs7QUFFTCxnQkFBSUMsVUFBVSxLQUFLRixZQUFMLENBQWtCRyxJQUFsQixDQUF1QkMsUUFBdkIsQ0FBZ0MsU0FBaEMsQ0FBZDs7QUFFQSxtQkFBT0YsUUFBUUcsU0FBZjtBQUNJSCx3QkFBUUksV0FBUixDQUFvQkosUUFBUUcsU0FBNUI7QUFESixhQUdBSCxRQUFRSyxTQUFSLENBQWtCQyxNQUFsQixDQUF5QmQsTUFBTWUsV0FBL0I7QUFFSDs7Ozs7O2tCQUlVZCxZIiwiZmlsZSI6IlJlc3REZWxlZ2F0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIENsYXNzIGZyb20gJ3dhdC1jbGFzc2VzJztcbmltcG9ydCBBdXRvY29tcGxldGVEZWxlZ2F0ZSBmcm9tICcuL0F1dG9jb21wbGV0ZURlbGVnYXRlJztcblxuLyoqXG4gKiBSZXN0RGVsZWdhdGUgaXMgdXNlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgaXMgbm90IGRvaW5nIGFueXRoaW5nIHNwZWNpYWwuXG4gKiBJdCBtYXkgaGF2ZSBmb2N1cyBidXQgdGhhdCdzIGl0LlxuICovXG5jbGFzcyBSZXN0RGVsZWdhdGUgZXh0ZW5kcyBBdXRvY29tcGxldGVEZWxlZ2F0ZSB7XG5cbiAgICBoYW5kbGVLZXlVcChlKSB7XG5cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpXG4gICAgICAgICAgICBlLnRhcmdldC5ibHVyKCk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcblxuICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAyNylcbiAgICAgICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VhcmNoKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZS52aWV3LmZpbmRCeUlkKCdvcHRpb25zJyk7XG5cbiAgICAgICAgd2hpbGUgKG9wdGlvbnMubGFzdENoaWxkKVxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVDaGlsZChvcHRpb25zLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLldBVF9WSVNJQkxFKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXN0RGVsZWdhdGVcbiJdfQ==