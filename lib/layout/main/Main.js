'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _main = require('./wml/main.wml');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Main area for content in the layout.
 */
var Main = function (_Widget) {
    _inherits(Main, _Widget);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_main2.default, this);
        }
    }]);

    return Main;
}(_runtime.Widget);

exports.default = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvbWFpbi9NYWluLmpzIl0sIm5hbWVzIjpbIk1haW4iLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsSTs7Ozs7Ozs7Ozs7aUNBRU87O0FBRUwsbUJBQU8sY0FBS0MsTUFBTCxpQkFBa0IsSUFBbEIsQ0FBUDtBQUVIOzs7Ozs7a0JBR1VELEkiLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmlldywgV2lkZ2V0fSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbWFpbiBmcm9tICcuL3dtbC9tYWluLndtbCc7XG5cbi8qKlxuICogTWFpbiBhcmVhIGZvciBjb250ZW50IGluIHRoZSBsYXlvdXQuXG4gKi9cbmNsYXNzIE1haW4gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHJldHVybiBWaWV3LnJlbmRlcihtYWluLCB0aGlzKTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgTWFpblxuXG4iXX0=