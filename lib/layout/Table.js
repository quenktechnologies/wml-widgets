'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Table
 */
var Table = function (_Widget) {
    _inherits(Table, _Widget);

    function Table(attrs, children) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, attrs, children));

        _this.data = attrs.read('wat:data', []);
        _this._layout = attrs.require('wat:layout');
        _this.fields = attrs.read('wat:fields', []);

        return _this;
    }

    /**
     * rowClicked
     */


    _createClass(Table, [{
        key: 'rowClicked',
        value: function rowClicked(e) {

            this.attributes.read('wat:onRowClicked', function () {})(e, this);
        }
    }, {
        key: 'render',
        value: function render() {

            if (!this._layout) throw new Error('Table: Layout not specified!');
            return _runtime.View.render(this._layout, this);
        }
    }]);

    return Table;
}(_runtime.Widget);

exports.default = Table;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXlvdXQvVGFibGUuanMiXSwibmFtZXMiOlsiVGFibGUiLCJhdHRycyIsImNoaWxkcmVuIiwiZGF0YSIsInJlYWQiLCJfbGF5b3V0IiwicmVxdWlyZSIsImZpZWxkcyIsImUiLCJhdHRyaWJ1dGVzIiwiRXJyb3IiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7OztJQUdNQSxLOzs7QUFFRixtQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxrSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLElBQUwsR0FBWUYsTUFBTUcsSUFBTixDQUFXLFVBQVgsRUFBdUIsRUFBdkIsQ0FBWjtBQUNBLGNBQUtDLE9BQUwsR0FBZUosTUFBTUssT0FBTixDQUFjLFlBQWQsQ0FBZjtBQUNBLGNBQUtDLE1BQUwsR0FBY04sTUFBTUcsSUFBTixDQUFXLFlBQVgsRUFBMkIsRUFBM0IsQ0FBZDs7QUFOeUI7QUFRNUI7O0FBRUQ7Ozs7Ozs7bUNBR1dJLEMsRUFBRzs7QUFFRixpQkFBS0MsVUFBTCxDQUFnQkwsSUFBaEIsQ0FBcUIsa0JBQXJCLEVBQXlDLFlBQVUsQ0FBRSxDQUFyRCxFQUF1REksQ0FBdkQsRUFBMEQsSUFBMUQ7QUFFWDs7O2lDQUVROztBQUVMLGdCQUFJLENBQUMsS0FBS0gsT0FBVixFQUFtQixNQUFNLElBQUlLLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ25CLG1CQUFPLGNBQUtDLE1BQUwsQ0FBWSxLQUFLTixPQUFqQixFQUEwQixJQUExQixDQUFQO0FBRUg7Ozs7OztrQkFHVUwsSyIsImZpbGUiOiJUYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcblxuLyoqXG4gKiBUYWJsZVxuICovXG5jbGFzcyBUYWJsZSBleHRlbmRzIFdpZGdldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihhdHRycywgY2hpbGRyZW4pIHtcblxuICAgICAgICBzdXBlcihhdHRycywgY2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGF0dHJzLnJlYWQoJ3dhdDpkYXRhJywgW10pO1xuICAgICAgICB0aGlzLl9sYXlvdXQgPSBhdHRycy5yZXF1aXJlKCd3YXQ6bGF5b3V0Jyk7XG4gICAgICAgIHRoaXMuZmllbGRzID0gYXR0cnMucmVhZCgnd2F0OmZpZWxkcycsICAgW10pO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcm93Q2xpY2tlZFxuICAgICAqL1xuICAgIHJvd0NsaWNrZWQoZSkge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpvblJvd0NsaWNrZWQnLCBmdW5jdGlvbigpe30pKGUsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5fbGF5b3V0KSB0aHJvdyBuZXcgRXJyb3IoJ1RhYmxlOiBMYXlvdXQgbm90IHNwZWNpZmllZCEnKTtcbiAgICAgICAgcmV0dXJuIFZpZXcucmVuZGVyKHRoaXMuX2xheW91dCwgdGhpcyk7XG5cbiAgICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFRhYmxlXG4iXX0=