'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _overlay = require('./overlay.wml');

var _overlay2 = _interopRequireDefault(_overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Overlay
 */
var Overlay = function (_Widget) {
    _inherits(Overlay, _Widget);

    function Overlay(attrs, children) {
        _classCallCheck(this, Overlay);

        var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, attrs, children));

        _this.view = new _runtime.View(_overlay2.default, _this);

        return _this;
    }

    _createClass(Overlay, [{
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Overlay;
}(_runtime.Widget);

exports.default = Overlay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvb3ZlcmxheS9PdmVybGF5LmpzIl0sIm5hbWVzIjpbIkNsYXNzIiwiT3ZlcmxheSIsImF0dHJzIiwiY2hpbGRyZW4iLCJ2aWV3IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztJQUFZQSxLOztBQUNaOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUMsTzs7O0FBRUYscUJBQVlDLEtBQVosRUFBbUJDLFFBQW5CLEVBQTZCO0FBQUE7O0FBQUEsc0hBRW5CRCxLQUZtQixFQUVaQyxRQUZZOztBQUl6QixjQUFLQyxJQUFMLEdBQVksMkNBQVo7O0FBSnlCO0FBTTVCOzs7O2lDQUVROztBQUVMLG1CQUFPLEtBQUtBLElBQUwsQ0FBVUMsTUFBVixFQUFQO0FBRUg7Ozs7OztrQkFHVUosTyIsImZpbGUiOiJPdmVybGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuaW1wb3J0IG92ZXJsYXkgZnJvbSAnLi9vdmVybGF5LndtbCc7XG5cbi8qKlxuICogT3ZlcmxheVxuICovXG5jbGFzcyBPdmVybGF5IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcob3ZlcmxheSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgT3ZlcmxheVxuIl19