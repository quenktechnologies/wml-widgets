'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Switch
 */
var Switch = function (_Widget) {
    _inherits(Switch, _Widget);

    function Switch(attrs, children) {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, attrs, children));

        _this.view = new _runtime.View(_layout2.default, _this);

        return _this;
    }

    _createClass(Switch, [{
        key: 'changed',
        value: function changed(e) {

            console.log(e);
        }
    }, {
        key: 'calculateValue',
        value: function calculateValue() {

            var onValue = this.attributes.read('wat:onValue');

            if (onValue === undefined || onValue === null) return this.attributes.read('wat:value');

            if (this.attributes.read('wat:value') === onValue) return true;
        }
    }, {
        key: 'render',
        value: function render() {

            return this.view.render();
        }
    }]);

    return Switch;
}(_runtime.Widget);

exports.default = Switch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3N3aXRjaC9Td2l0Y2guanMiXSwibmFtZXMiOlsiU3dpdGNoIiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciLCJlIiwiY29uc29sZSIsImxvZyIsIm9uVmFsdWUiLCJhdHRyaWJ1dGVzIiwicmVhZCIsInVuZGVmaW5lZCIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdNQSxNOzs7QUFFRixvQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxvSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLElBQUwsR0FBWSwwQ0FBWjs7QUFKeUI7QUFNNUI7Ozs7Z0NBRU9DLEMsRUFBRzs7QUFFUEMsb0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUVIOzs7eUNBRWdCOztBQUViLGdCQUFJRyxVQUFVLEtBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLGFBQXJCLENBQWQ7O0FBRUEsZ0JBQUlGLFlBQVlHLFNBQWIsSUFBNEJILFlBQVksSUFBM0MsRUFDRyxPQUFPLEtBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLFdBQXJCLENBQVA7O0FBRUgsZ0JBQUcsS0FBS0QsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsV0FBckIsTUFBc0NGLE9BQXpDLEVBQ0ksT0FBTyxJQUFQO0FBRVA7OztpQ0FFUTs7QUFFTCxtQkFBTyxLQUFLSixJQUFMLENBQVVRLE1BQVYsRUFBUDtBQUVIOzs7Ozs7a0JBSVVYLE0iLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuLyoqXG4gKiBTd2l0Y2hcbiAqL1xuY2xhc3MgU3dpdGNoIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcblxuICAgIH1cblxuICAgIGNoYW5nZWQoZSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgfVxuXG4gICAgY2FsY3VsYXRlVmFsdWUoKSB7XG5cbiAgICAgICAgdmFyIG9uVmFsdWUgPSB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0Om9uVmFsdWUnKTtcblxuICAgICAgICBpZigob25WYWx1ZSA9PT0gdW5kZWZpbmVkKSB8fCAob25WYWx1ZSA9PT0gbnVsbCkpXG4gICAgICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnZhbHVlJyk7XG5cbiAgICAgICAgaWYodGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZScpID09PSBvblZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudmlldy5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTd2l0Y2hcbiJdfQ==