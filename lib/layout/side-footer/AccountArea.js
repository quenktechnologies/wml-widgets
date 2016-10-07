'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _account_area = require('./wml/account_area.wml');

var _account_area2 = _interopRequireDefault(_account_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * AccountArea
 */
var AccountArea = function (_Widget) {
    _inherits(AccountArea, _Widget);

    function AccountArea() {
        _classCallCheck(this, AccountArea);

        return _possibleConstructorReturn(this, (AccountArea.__proto__ || Object.getPrototypeOf(AccountArea)).apply(this, arguments));
    }

    _createClass(AccountArea, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_account_area2.default, this);
        }
    }]);

    return AccountArea;
}(_runtime.Widget);

exports.default = AccountArea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvc2lkZS1mb290ZXIvQWNjb3VudEFyZWEuanMiXSwibmFtZXMiOlsiQWNjb3VudEFyZWEiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsVzs7Ozs7Ozs7Ozs7aUNBRU87O0FBRUwsbUJBQU8sY0FBS0MsTUFBTCx5QkFBMEIsSUFBMUIsQ0FBUDtBQUVIOzs7Ozs7a0JBSVVELFciLCJmaWxlIjoiQWNjb3VudEFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYWNjb3VudF9hcmVhIGZyb20gJy4vd21sL2FjY291bnRfYXJlYS53bWwnO1xuXG4vKipcbiAqIEFjY291bnRBcmVhXG4gKi9cbmNsYXNzIEFjY291bnRBcmVhIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIoYWNjb3VudF9hcmVhLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50QXJlYVxuIl19