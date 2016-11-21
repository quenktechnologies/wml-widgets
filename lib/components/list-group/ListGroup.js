'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _list_group = require('./list_group.wml');

var _list_group2 = _interopRequireDefault(_list_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ListGroup
 */
var ListGroup = function (_Widget) {
    _inherits(ListGroup, _Widget);

    function ListGroup() {
        _classCallCheck(this, ListGroup);

        return _possibleConstructorReturn(this, (ListGroup.__proto__ || Object.getPrototypeOf(ListGroup)).apply(this, arguments));
    }

    _createClass(ListGroup, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_list_group2.default, this);
        }
    }]);

    return ListGroup;
}(_runtime.Widget);

exports.default = ListGroup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2xpc3QtZ3JvdXAvTGlzdEdyb3VwLmpzIl0sIm5hbWVzIjpbIkxpc3RHcm91cCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxTOzs7Ozs7Ozs7OztpQ0FFTzs7QUFFTCxtQkFBTyxjQUFLQyxNQUFMLHVCQUF3QixJQUF4QixDQUFQO0FBRUg7Ozs7OztrQkFJVUQsUyIsImZpbGUiOiJMaXN0R3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGlzdF9ncm91cCBmcm9tICcuL2xpc3RfZ3JvdXAud21sJztcblxuLyoqXG4gKiBMaXN0R3JvdXBcbiAqL1xuY2xhc3MgTGlzdEdyb3VwIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobGlzdF9ncm91cCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdEdyb3VwXG4iXX0=