'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _logoimage = require('./wml/logoimage.wml');

var _logoimage2 = _interopRequireDefault(_logoimage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * LogoImage
 */
var LogoImage = function (_Widget) {
    _inherits(LogoImage, _Widget);

    function LogoImage() {
        _classCallCheck(this, LogoImage);

        return _possibleConstructorReturn(this, (LogoImage.__proto__ || Object.getPrototypeOf(LogoImage)).apply(this, arguments));
    }

    _createClass(LogoImage, [{
        key: 'render',
        value: function render() {

            return _runtime.View.render(_logoimage2.default, this);
        }
    }]);

    return LogoImage;
}(_runtime.Widget);

exports.default = LogoImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvbG9nb2ltYWdlL0xvZ29JbWFnZS5qcyJdLCJuYW1lcyI6WyJMb2dvSW1hZ2UiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsUzs7Ozs7Ozs7Ozs7aUNBRU87O0FBRUwsbUJBQU8sY0FBS0MsTUFBTCxzQkFBdUIsSUFBdkIsQ0FBUDtBQUVIOzs7Ozs7a0JBSVVELFMiLCJmaWxlIjoiTG9nb0ltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxvZ29pbWFnZSBmcm9tICcuL3dtbC9sb2dvaW1hZ2Uud21sJztcblxuLyoqXG4gKiBMb2dvSW1hZ2VcbiAqL1xuY2xhc3MgTG9nb0ltYWdlIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gVmlldy5yZW5kZXIobG9nb2ltYWdlLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dvSW1hZ2VcbiJdfQ==