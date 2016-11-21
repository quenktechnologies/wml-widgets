'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _tab = require('./tab.wml');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Tab
 */
var Tab = function (_Widget) {
    _inherits(Tab, _Widget);

    function Tab() {
        _classCallCheck(this, Tab);

        var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));

        _this.view = new _runtime.View(_tab2.default, _this);

        return _this;
    }

    _createClass(Tab, [{
        key: 'clicked',
        value: function clicked(e) {

            e.preventDefault();

            var parent = this.view.root.parentNode;
            var us = parent.children;

            for (var i = 0; i < us.length; i++) {
                us[i].classList.remove('active');
            }this.view.root.classList.add('active');
            this.attributes.read('wat:onClick', function () {})();
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Tab;
}(_runtime.Widget);

exports.default = Tab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RhYnMvVGFiLmpzIl0sIm5hbWVzIjpbIlRhYiIsImFyZ3VtZW50cyIsInZpZXciLCJlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnQiLCJyb290IiwicGFyZW50Tm9kZSIsInVzIiwiY2hpbGRyZW4iLCJpIiwibGVuZ3RoIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiYXR0cmlidXRlcyIsInJlYWQiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsRzs7O0FBRUYsbUJBQWM7QUFBQTs7QUFBQSwrR0FFREMsU0FGQzs7QUFJVixjQUFLQyxJQUFMLEdBQVksdUNBQVo7O0FBSlU7QUFNYjs7OztnQ0FFT0MsQyxFQUFHOztBQUVQQSxjQUFFQyxjQUFGOztBQUVBLGdCQUFJQyxTQUFTLEtBQUtILElBQUwsQ0FBVUksSUFBVixDQUFlQyxVQUE1QjtBQUNBLGdCQUFJQyxLQUFLSCxPQUFPSSxRQUFoQjs7QUFFQSxpQkFBSSxJQUFJQyxJQUFFLENBQVYsRUFBYUEsSUFBRUYsR0FBR0csTUFBbEIsRUFBMEJELEdBQTFCO0FBQ0lGLG1CQUFHRSxDQUFILEVBQU1FLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCLFFBQXZCO0FBREosYUFHQSxLQUFLWCxJQUFMLENBQVVJLElBQVYsQ0FBZU0sU0FBZixDQUF5QkUsR0FBekIsQ0FBNkIsUUFBN0I7QUFDQSxpQkFBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsYUFBckIsRUFBb0MsWUFBVyxDQUFFLENBQWpEO0FBRUg7OztpQ0FFUTs7QUFFTCxtQkFBTyxLQUFLZCxJQUFMLENBQVVlLE1BQVYsRUFBUDtBQUVIOzs7Ozs7a0JBSVVqQixHIiwiZmlsZSI6IlRhYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBsYXlvdXQgZnJvbSAnLi90YWIud21sJztcblxuLyoqXG4gKiBUYWJcbiAqL1xuY2xhc3MgVGFiIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcblxuICAgIH1cblxuICAgIGNsaWNrZWQoZSkge1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy52aWV3LnJvb3QucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIHVzID0gcGFyZW50LmNoaWxkcmVuO1xuXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPHVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG5cbiAgICAgICAgdGhpcy52aWV3LnJvb3QuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6b25DbGljaycsIGZ1bmN0aW9uKCkge30pKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJcbiJdfQ==