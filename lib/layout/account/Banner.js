'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _account = require('./wml/account.wml');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Account
 */
var Account = function (_Widget) {
    _inherits(Account, _Widget);

    function Account() {
        _classCallCheck(this, Account);

        return _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).apply(this, arguments));
    }

    _createClass(Account, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_account2.default, this);
        }
    }]);

    return Account;
}(_runtime.Widget);

exports.default = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvYWNjb3VudC9CYW5uZXIuanMiXSwibmFtZXMiOlsiQWNjb3VudCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxPOzs7Ozs7Ozs7OztpQ0FFTzs7QUFFTCxtQkFBTyxjQUFLQyxNQUFMLG9CQUFxQixJQUFyQixDQUFQO0FBRUg7Ozs7OztrQkFJVUQsTyIsImZpbGUiOiJCYW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZpZXcsIFdpZGdldH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGFjY291bnQgZnJvbSAnLi93bWwvYWNjb3VudC53bWwnO1xuXG4vKipcbiAqIEFjY291bnRcbiAqL1xuY2xhc3MgQWNjb3VudCBleHRlbmRzIFdpZGdldCB7XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGFjY291bnQsIHRoaXMpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFjY291bnRcblxuIl19