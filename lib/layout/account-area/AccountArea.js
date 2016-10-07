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
        key: 'toggle',
        value: function toggle() {}
    }, {
        key: 'render',
        value: function render() {

            return _runtime.View.render(_account_area2.default, this);
        }
    }]);

    return AccountArea;
}(_runtime.Widget);

exports.default = AccountArea;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvYWNjb3VudC1hcmVhL0FjY291bnRBcmVhLmpzIl0sIm5hbWVzIjpbIkFjY291bnRBcmVhIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLFc7Ozs7Ozs7Ozs7O2lDQUVPLENBR1I7OztpQ0FFUTs7QUFFTCxtQkFBTyxjQUFLQyxNQUFMLHlCQUEwQixJQUExQixDQUFQO0FBRUg7Ozs7OztrQkFJVUQsVyIsImZpbGUiOiJBY2NvdW50QXJlYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBhY2NvdW50X2FyZWEgZnJvbSAnLi93bWwvYWNjb3VudF9hcmVhLndtbCc7XG5cbi8qKlxuICogQWNjb3VudEFyZWFcbiAqL1xuY2xhc3MgQWNjb3VudEFyZWEgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgdG9nZ2xlKCkge1xuXG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKGFjY291bnRfYXJlYSwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWNjb3VudEFyZWFcbiJdfQ==