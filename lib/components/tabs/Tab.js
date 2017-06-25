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

    /**
     * click this Tab
     */


    _createClass(Tab, [{
        key: 'click',
        value: function click() {

            this.view.findById('link').click();
        }
    }, {
        key: 'clicked',
        value: function clicked(e) {

            e.preventDefault();

            var parent = this.view.root.parentNode;
            var us = parent.children;

            for (var i = 0; i < us.length; i++) {
                us[i].classList.remove('active');
            }this.view.root.classList.add('active');
            this.attributes.read('wat:onClick', function () {})(this.attributes.read('wat:name'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3RhYnMvVGFiLmpzIl0sIm5hbWVzIjpbIlRhYiIsImFyZ3VtZW50cyIsInZpZXciLCJmaW5kQnlJZCIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0IiwicGFyZW50Iiwicm9vdCIsInBhcmVudE5vZGUiLCJ1cyIsImNoaWxkcmVuIiwiaSIsImxlbmd0aCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImF0dHJpYnV0ZXMiLCJyZWFkIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01BLEc7OztBQUVGLG1CQUFjO0FBQUE7O0FBQUEsK0dBRURDLFNBRkM7O0FBSVYsY0FBS0MsSUFBTCxHQUFZLHVDQUFaOztBQUpVO0FBTWI7O0FBRUQ7Ozs7Ozs7Z0NBR1E7O0FBRUosaUJBQUtBLElBQUwsQ0FBVUMsUUFBVixDQUFtQixNQUFuQixFQUEyQkMsS0FBM0I7QUFFSDs7O2dDQUVPQyxDLEVBQUc7O0FBRVBBLGNBQUVDLGNBQUY7O0FBRUEsZ0JBQUlDLFNBQVMsS0FBS0wsSUFBTCxDQUFVTSxJQUFWLENBQWVDLFVBQTVCO0FBQ0EsZ0JBQUlDLEtBQUtILE9BQU9JLFFBQWhCOztBQUVBLGlCQUFJLElBQUlDLElBQUUsQ0FBVixFQUFhQSxJQUFFRixHQUFHRyxNQUFsQixFQUEwQkQsR0FBMUI7QUFDSUYsbUJBQUdFLENBQUgsRUFBTUUsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUIsUUFBdkI7QUFESixhQUdBLEtBQUtiLElBQUwsQ0FBVU0sSUFBVixDQUFlTSxTQUFmLENBQXlCRSxHQUF6QixDQUE2QixRQUE3QjtBQUNBLGlCQUFLQyxVQUFMLENBQWdCQyxJQUFoQixDQUFxQixhQUFyQixFQUFvQyxZQUFXLENBQUUsQ0FBakQsRUFBbUQsS0FBS0QsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsVUFBckIsQ0FBbkQ7QUFFSDs7O2lDQUVROztBQUVMLG1CQUFPLEtBQUtoQixJQUFMLENBQVVpQixNQUFWLEVBQVA7QUFFSDs7Ozs7O2tCQUlVbkIsRyIsImZpbGUiOiJUYWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBXaWRnZXQgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgbGF5b3V0IGZyb20gJy4vdGFiLndtbCc7XG5cbi8qKlxuICogVGFiXG4gKi9cbmNsYXNzIFRhYiBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuXG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGxheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjbGljayB0aGlzIFRhYlxuICAgICAqL1xuICAgIGNsaWNrKCkge1xuXG4gICAgICAgIHRoaXMudmlldy5maW5kQnlJZCgnbGluaycpLmNsaWNrKCk7XG5cbiAgICB9XG5cbiAgICBjbGlja2VkKGUpIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMudmlldy5yb290LnBhcmVudE5vZGU7XG4gICAgICAgIHZhciB1cyA9IHBhcmVudC5jaGlsZHJlbjtcblxuICAgICAgICBmb3IodmFyIGk9MDsgaTx1cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHVzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXG4gICAgICAgIHRoaXMudmlldy5yb290LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uQ2xpY2snLCBmdW5jdGlvbigpIHt9KSh0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om5hbWUnKSk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJcbiJdfQ==