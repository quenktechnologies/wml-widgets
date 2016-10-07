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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvYWNjb3VudC9BY2NvdW50LmpzIl0sIm5hbWVzIjpbIkFjY291bnQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsTzs7Ozs7Ozs7Ozs7aUNBRU87O0FBRUwsbUJBQU8sY0FBS0MsTUFBTCxvQkFBcUIsSUFBckIsQ0FBUDtBQUVIOzs7Ozs7a0JBSVVELE8iLCJmaWxlIjoiQWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmlldywgV2lkZ2V0fSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgYWNjb3VudCBmcm9tICcuL3dtbC9hY2NvdW50LndtbCc7XG5cbi8qKlxuICogQWNjb3VudFxuICovXG5jbGFzcyBBY2NvdW50IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIoYWNjb3VudCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudFxuXG4iXX0=