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

    function Main(attrs, children) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, attrs, children));

        _this.view = new _runtime.View(_main2.default, _this);

        return _this;
    }

    /**
     * setContent replaces the content of this Main view.
     * @param {Renderable} r
     */


    _createClass(Main, [{
        key: 'setContent',
        value: function setContent(r) {

            var root = this.view.findById('root');

            while (root.lastChild) {
                root.removeChild(root.lastChild);
            }root.appendChild(r.render());
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Main;
}(_runtime.Widget);

exports.default = Main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXlvdXQvbWFpbi9NYWluLmpzIl0sIm5hbWVzIjpbIk1haW4iLCJhdHRycyIsImNoaWxkcmVuIiwidmlldyIsInIiLCJyb290IiwiZmluZEJ5SWQiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLEk7OztBQUVGLGtCQUFZQyxLQUFaLEVBQW1CQyxRQUFuQixFQUE2QjtBQUFBOztBQUFBLGdIQUVuQkQsS0FGbUIsRUFFWkMsUUFGWTs7QUFHekIsY0FBS0MsSUFBTCxHQUFZLHdDQUFaOztBQUh5QjtBQUs1Qjs7QUFFRDs7Ozs7Ozs7bUNBSVdDLEMsRUFBRzs7QUFFVixnQkFBSUMsT0FBTyxLQUFLRixJQUFMLENBQVVHLFFBQVYsQ0FBbUIsTUFBbkIsQ0FBWDs7QUFFQSxtQkFBT0QsS0FBS0UsU0FBWjtBQUNJRixxQkFBS0csV0FBTCxDQUFpQkgsS0FBS0UsU0FBdEI7QUFESixhQUdBRixLQUFLSSxXQUFMLENBQWlCTCxFQUFFTSxNQUFGLEVBQWpCO0FBR0g7OztpQ0FFUTs7QUFFTCxtQkFBTyxLQUFLUCxJQUFMLENBQVVPLE1BQVYsRUFBUDtBQUVIOzs7Ozs7a0JBR1VWLEkiLCJmaWxlIjoiTWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBtYWluIGZyb20gJy4vd21sL21haW4ud21sJztcblxuLyoqXG4gKiBNYWluIGFyZWEgZm9yIGNvbnRlbnQgaW4gdGhlIGxheW91dC5cbiAqL1xuY2xhc3MgTWFpbiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyhtYWluLCB0aGlzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldENvbnRlbnQgcmVwbGFjZXMgdGhlIGNvbnRlbnQgb2YgdGhpcyBNYWluIHZpZXcuXG4gICAgICogQHBhcmFtIHtSZW5kZXJhYmxlfSByXG4gICAgICovXG4gICAgc2V0Q29udGVudChyKSB7XG5cbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ3Jvb3QnKTtcblxuICAgICAgICB3aGlsZSAocm9vdC5sYXN0Q2hpbGQpXG4gICAgICAgICAgICByb290LnJlbW92ZUNoaWxkKHJvb3QubGFzdENoaWxkKTtcblxuICAgICAgICByb290LmFwcGVuZENoaWxkKHIucmVuZGVyKCkpO1xuXG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgTWFpblxuIl19