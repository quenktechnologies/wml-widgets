'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _column = require('./wml/column.wml');

var _column2 = _interopRequireDefault(_column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Column
 */
var Column = function (_Widget) {
    _inherits(Column, _Widget);

    function Column(attrs, children) {
        _classCallCheck(this, Column);

        var _this = _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).call(this, attrs, children));

        _this.className = attrs.read('wat:class', 'col-md-12');

        return _this;
    }

    _createClass(Column, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_column2.default, this);
        }
    }]);

    return Column;
}(_runtime.Widget);

exports.default = Column;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0NvbHVtbi5qcyJdLCJuYW1lcyI6WyJDb2x1bW4iLCJhdHRycyIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwicmVhZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxNOzs7QUFFRixvQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxvSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLFNBQUwsR0FBaUJGLE1BQU1HLElBQU4sQ0FBVyxXQUFYLEVBQXdCLFdBQXhCLENBQWpCOztBQUp5QjtBQU01Qjs7OztpQ0FFUTs7QUFFTCxtQkFBTyxjQUFLQyxNQUFMLG1CQUFvQixJQUFwQixDQUFQO0FBRUg7Ozs7OztrQkFJVUwsTSIsImZpbGUiOiJDb2x1bW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vd21sL2NvbHVtbi53bWwnO1xuXG4vKipcbiAqIENvbHVtblxuICovXG5jbGFzcyBDb2x1bW4gZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLmNsYXNzTmFtZSA9IGF0dHJzLnJlYWQoJ3dhdDpjbGFzcycsICdjb2wtbWQtMTInKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobGF5b3V0LCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2x1bW5cbiJdfQ==