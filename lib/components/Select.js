'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View = require('wml/lib/runtime/View');

var _View2 = _interopRequireDefault(_View);

var _vertical_input = require('./wml/vertical_input.wml');

var _vertical_input2 = _interopRequireDefault(_vertical_input);

var _vertical_textarea = require('./wml/vertical_textarea.wml');

var _vertical_textarea2 = _interopRequireDefault(_vertical_textarea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Input
 */
var Input = function () {
    function Input(attrs) {
        _classCallCheck(this, Input);

        this.id = attrs.html.id || '';
        this.name = attrs.html.name || '';
        this.type = attrs.html.type || 'text';
        this.class = attrs.html.class || '';
        this.value = attrs.html.value || '';

        if (attrs.ns.bs) {
            this.has = attrs.ns.bs.has || '';
            this.message = attrs.ns.bs.message || '';
            this.label = attrs.ns.bs.label || '';
            this.set = attrs.ns.bs.set || '';
        }

        this.view = new _View2.default(this.getLayout(), this);
    }

    _createClass(Input, [{
        key: 'getLayout',
        value: function getLayout() {

            return _vertical_input2.default;
        }

        /**
         * getClass 
         */

    }, {
        key: 'getClass',
        value: function getClass() {

            var c = 'form-group ' + this.class;

            if (!this.message) return c;

            return c + ' has-error';
        }
    }, {
        key: 'input',
        value: function input(e) {

            var span = this.view.findById('span');

            if (this.set) this.set(e.target.name, e.target.value);

            span.innerHTML = '';
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Input;
}();

/**
 * Textarea
 */


var Textarea = function (_Input) {
    _inherits(Textarea, _Input);

    function Textarea() {
        _classCallCheck(this, Textarea);

        return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).apply(this, arguments));
    }

    _createClass(Textarea, [{
        key: 'getLayout',
        value: function getLayout() {

            return _vertical_textarea2.default;
        }
    }]);

    return Textarea;
}(Input);

Input.Text = Textarea;
exports.default = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1NlbGVjdC5qcyJdLCJuYW1lcyI6WyJJbnB1dCIsImF0dHJzIiwiaWQiLCJodG1sIiwibmFtZSIsInR5cGUiLCJjbGFzcyIsInZhbHVlIiwibnMiLCJicyIsImhhcyIsIm1lc3NhZ2UiLCJsYWJlbCIsInNldCIsInZpZXciLCJnZXRMYXlvdXQiLCJjIiwiZSIsInNwYW4iLCJmaW5kQnlJZCIsInRhcmdldCIsImlubmVySFRNTCIsInJlbmRlciIsIlRleHRhcmVhIiwiVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsSztBQUVGLG1CQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBRWYsYUFBS0MsRUFBTCxHQUFVRCxNQUFNRSxJQUFOLENBQVdELEVBQVgsSUFBaUIsRUFBM0I7QUFDQSxhQUFLRSxJQUFMLEdBQVlILE1BQU1FLElBQU4sQ0FBV0MsSUFBWCxJQUFtQixFQUEvQjtBQUNBLGFBQUtDLElBQUwsR0FBWUosTUFBTUUsSUFBTixDQUFXRSxJQUFYLElBQW1CLE1BQS9CO0FBQ0EsYUFBS0MsS0FBTCxHQUFhTCxNQUFNRSxJQUFOLENBQVdHLEtBQVgsSUFBb0IsRUFBakM7QUFDQSxhQUFLQyxLQUFMLEdBQWFOLE1BQU1FLElBQU4sQ0FBV0ksS0FBWCxJQUFvQixFQUFqQzs7QUFFQSxZQUFJTixNQUFNTyxFQUFOLENBQVNDLEVBQWIsRUFBaUI7QUFDYixpQkFBS0MsR0FBTCxHQUFXVCxNQUFNTyxFQUFOLENBQVNDLEVBQVQsQ0FBWUMsR0FBWixJQUFtQixFQUE5QjtBQUNBLGlCQUFLQyxPQUFMLEdBQWVWLE1BQU1PLEVBQU4sQ0FBU0MsRUFBVCxDQUFZRSxPQUFaLElBQXVCLEVBQXRDO0FBQ0EsaUJBQUtDLEtBQUwsR0FBYVgsTUFBTU8sRUFBTixDQUFTQyxFQUFULENBQVlHLEtBQVosSUFBcUIsRUFBbEM7QUFDQSxpQkFBS0MsR0FBTCxHQUFXWixNQUFNTyxFQUFOLENBQVNDLEVBQVQsQ0FBWUksR0FBWixJQUFtQixFQUE5QjtBQUNIOztBQUVELGFBQUtDLElBQUwsR0FBWSxtQkFBUyxLQUFLQyxTQUFMLEVBQVQsRUFBMkIsSUFBM0IsQ0FBWjtBQUVIOzs7O29DQUVXOztBQUVSO0FBRUg7O0FBRUQ7Ozs7OzttQ0FHVzs7QUFFUCxnQkFBSUMsb0JBQWtCLEtBQUtWLEtBQTNCOztBQUVBLGdCQUFJLENBQUMsS0FBS0ssT0FBVixFQUNJLE9BQU9LLENBQVA7O0FBRUosbUJBQVVBLENBQVY7QUFFSDs7OzhCQUVLQyxDLEVBQUc7O0FBRUwsZ0JBQUlDLE9BQU8sS0FBS0osSUFBTCxDQUFVSyxRQUFWLENBQW1CLE1BQW5CLENBQVg7O0FBRUEsZ0JBQUksS0FBS04sR0FBVCxFQUNJLEtBQUtBLEdBQUwsQ0FBU0ksRUFBRUcsTUFBRixDQUFTaEIsSUFBbEIsRUFBd0JhLEVBQUVHLE1BQUYsQ0FBU2IsS0FBakM7O0FBRUpXLGlCQUFLRyxTQUFMLEdBQWlCLEVBQWpCO0FBRUg7OztpQ0FFUTs7QUFFTCxtQkFBTyxLQUFLUCxJQUFMLENBQVVRLE1BQVYsRUFBUDtBQUVIOzs7Ozs7QUFJTDs7Ozs7SUFHTUMsUTs7Ozs7Ozs7Ozs7b0NBRVU7O0FBRVI7QUFFSDs7OztFQU5rQnZCLEs7O0FBVXZCQSxNQUFNd0IsSUFBTixHQUFhRCxRQUFiO2tCQUNldkIsSyIsImZpbGUiOiJTZWxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlldyBmcm9tICd3bWwvbGliL3J1bnRpbWUvVmlldyc7XG5pbXBvcnQgdmVydGljYWwgZnJvbSAnLi93bWwvdmVydGljYWxfaW5wdXQud21sJztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL3dtbC92ZXJ0aWNhbF90ZXh0YXJlYS53bWwnO1xuXG4vKipcbiAqIElucHV0XG4gKi9cbmNsYXNzIElucHV0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzKSB7XG5cbiAgICAgICAgdGhpcy5pZCA9IGF0dHJzLmh0bWwuaWQgfHwgJyc7XG4gICAgICAgIHRoaXMubmFtZSA9IGF0dHJzLmh0bWwubmFtZSB8fCAnJztcbiAgICAgICAgdGhpcy50eXBlID0gYXR0cnMuaHRtbC50eXBlIHx8ICd0ZXh0JztcbiAgICAgICAgdGhpcy5jbGFzcyA9IGF0dHJzLmh0bWwuY2xhc3MgfHwgJyc7XG4gICAgICAgIHRoaXMudmFsdWUgPSBhdHRycy5odG1sLnZhbHVlIHx8ICcnO1xuXG4gICAgICAgIGlmIChhdHRycy5ucy5icykge1xuICAgICAgICAgICAgdGhpcy5oYXMgPSBhdHRycy5ucy5icy5oYXMgfHwgJyc7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBhdHRycy5ucy5icy5tZXNzYWdlIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGF0dHJzLm5zLmJzLmxhYmVsIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5zZXQgPSBhdHRycy5ucy5icy5zZXQgfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpZXcgPSBuZXcgVmlldyh0aGlzLmdldExheW91dCgpLCB0aGlzKTtcblxuICAgIH1cblxuICAgIGdldExheW91dCgpIHtcblxuICAgICAgICByZXR1cm4gdmVydGljYWw7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXRDbGFzcyBcbiAgICAgKi9cbiAgICBnZXRDbGFzcygpIHtcblxuICAgICAgICB2YXIgYyA9IGBmb3JtLWdyb3VwICR7dGhpcy5jbGFzc31gO1xuXG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlKVxuICAgICAgICAgICAgcmV0dXJuIGM7XG5cbiAgICAgICAgcmV0dXJuIGAke2N9IGhhcy1lcnJvcmA7XG5cbiAgICB9XG5cbiAgICBpbnB1dChlKSB7XG5cbiAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnZpZXcuZmluZEJ5SWQoJ3NwYW4nKTtcblxuICAgICAgICBpZiAodGhpcy5zZXQpXG4gICAgICAgICAgICB0aGlzLnNldChlLnRhcmdldC5uYW1lLCBlLnRhcmdldC52YWx1ZSk7XG5cbiAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnJztcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJlbmRlcigpO1xuXG4gICAgfVxuXG59XG5cbi8qKlxuICogVGV4dGFyZWFcbiAqL1xuY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dCB7XG5cbiAgICBnZXRMYXlvdXQoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRleHRhcmVhO1xuXG4gICAgfVxuXG59XG5cbklucHV0LlRleHQgPSBUZXh0YXJlYVxuZXhwb3J0IGRlZmF1bHQgSW5wdXRcbiJdfQ==