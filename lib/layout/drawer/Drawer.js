'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _drawer = require('./wml/drawer.wml');

var _drawer2 = _interopRequireDefault(_drawer);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Drawer
 */
var Drawer = function (_Widget) {
    _inherits(Drawer, _Widget);

    function Drawer(attrs, children) {
        _classCallCheck(this, Drawer);

        var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, attrs, children));

        _this.view = new _runtime.View(_drawer2.default, _this);

        return _this;
    }

    /**
     * toggle the visibility of this Drawer
     */


    _createClass(Drawer, [{
        key: 'toggle',
        value: function toggle() {

            this.view.findById('drawer').classList.toggle(Class.VISIBLE);
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Drawer;
}(_runtime.Widget);

exports.default = Drawer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvZHJhd2VyL0RyYXdlci5qcyJdLCJuYW1lcyI6WyJDbGFzcyIsIkRyYXdlciIsImF0dHJzIiwiY2hpbGRyZW4iLCJ2aWV3IiwiZmluZEJ5SWQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJWSVNJQkxFIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0lBQVlBLEs7Ozs7Ozs7Ozs7OztBQUVaOzs7SUFHTUMsTTs7O0FBRUYsb0JBQVlDLEtBQVosRUFBbUJDLFFBQW5CLEVBQTZCO0FBQUE7O0FBQUEsb0hBRW5CRCxLQUZtQixFQUVaQyxRQUZZOztBQUd6QixjQUFLQyxJQUFMLEdBQVksMENBQVo7O0FBSHlCO0FBSzVCOztBQUVEOzs7Ozs7O2lDQUdTOztBQUVMLGlCQUFLQSxJQUFMLENBQVVDLFFBQVYsQ0FBbUIsUUFBbkIsRUFBNkJDLFNBQTdCLENBQXVDQyxNQUF2QyxDQUE4Q1AsTUFBTVEsT0FBcEQ7QUFFSDs7O2lDQUVROztBQUVMLG1CQUFPLEtBQUtKLElBQUwsQ0FBVUssTUFBVixFQUFQO0FBRUg7Ozs7OztrQkFJVVIsTSIsImZpbGUiOiJEcmF3ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgZHJhd2VyIGZyb20gJy4vd21sL2RyYXdlci53bWwnO1xuaW1wb3J0ICogYXMgQ2xhc3MgZnJvbSAnd2F0LWNsYXNzZXMnO1xuXG4vKipcbiAqIERyYXdlclxuICovXG5jbGFzcyBEcmF3ZXIgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcoZHJhd2VyLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGlzIERyYXdlclxuICAgICAqL1xuICAgIHRvZ2dsZSgpIHtcblxuICAgICAgICB0aGlzLnZpZXcuZmluZEJ5SWQoJ2RyYXdlcicpLmNsYXNzTGlzdC50b2dnbGUoQ2xhc3MuVklTSUJMRSk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEcmF3ZXJcbiJdfQ==