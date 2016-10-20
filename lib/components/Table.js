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

        _this.data = attrs.ns.bs.data;
        _this._layout = attrs.ns.bs.layout;
        _this.fields = attrs.ns.bs.fields || [];

        return _this;
    }

    /**
     * rowClicked
     */


    _createClass(Table, [{
        key: 'rowClicked',
        value: function rowClicked(e) {

            if (this.attributes.ns) if (this.attributes.ns.bs.onRowClicked) this.attributes.ns.bs.onRowClicked(e, this);
        }
    }, {
        key: 'render',
        value: function render() {

            if (!this._layout) throw new Error('Table: Layout not specified!');

            return new _runtime.View(this._layout, this).render();
        }
    }]);

    return Table;
}(_runtime.Widget);

exports.default = Table;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1RhYmxlLmpzIl0sIm5hbWVzIjpbIlRhYmxlIiwiYXR0cnMiLCJjaGlsZHJlbiIsImRhdGEiLCJucyIsImJzIiwiX2xheW91dCIsImxheW91dCIsImZpZWxkcyIsImUiLCJhdHRyaWJ1dGVzIiwib25Sb3dDbGlja2VkIiwiRXJyb3IiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7OztJQUdNQSxLOzs7QUFFRixtQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxrSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLElBQUwsR0FBWUYsTUFBTUcsRUFBTixDQUFTQyxFQUFULENBQVlGLElBQXhCO0FBQ0EsY0FBS0csT0FBTCxHQUFlTCxNQUFNRyxFQUFOLENBQVNDLEVBQVQsQ0FBWUUsTUFBM0I7QUFDQSxjQUFLQyxNQUFMLEdBQWNQLE1BQU1HLEVBQU4sQ0FBU0MsRUFBVCxDQUFZRyxNQUFaLElBQXNCLEVBQXBDOztBQU55QjtBQVE1Qjs7QUFFRDs7Ozs7OzttQ0FHV0MsQyxFQUFHOztBQUVWLGdCQUFJLEtBQUtDLFVBQUwsQ0FBZ0JOLEVBQXBCLEVBQ0ksSUFBSSxLQUFLTSxVQUFMLENBQWdCTixFQUFoQixDQUFtQkMsRUFBbkIsQ0FBc0JNLFlBQTFCLEVBQ0ksS0FBS0QsVUFBTCxDQUFnQk4sRUFBaEIsQ0FBbUJDLEVBQW5CLENBQXNCTSxZQUF0QixDQUFtQ0YsQ0FBbkMsRUFBc0MsSUFBdEM7QUFFWDs7O2lDQUVROztBQUVMLGdCQUFJLENBQUMsS0FBS0gsT0FBVixFQUFtQixNQUFNLElBQUlNLEtBQUosQ0FBVSw4QkFBVixDQUFOOztBQUVuQixtQkFBUSxrQkFBUyxLQUFLTixPQUFkLEVBQXVCLElBQXZCLENBQUQsQ0FBK0JPLE1BQS9CLEVBQVA7QUFFSDs7Ozs7O2tCQUdVYixLIiwiZmlsZSI6IlRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldywgV2lkZ2V0IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuXG4vKipcbiAqIFRhYmxlXG4gKi9cbmNsYXNzIFRhYmxlIGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIGNvbnN0cnVjdG9yKGF0dHJzLCBjaGlsZHJlbikge1xuXG4gICAgICAgIHN1cGVyKGF0dHJzLCBjaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5kYXRhID0gYXR0cnMubnMuYnMuZGF0YTtcbiAgICAgICAgdGhpcy5fbGF5b3V0ID0gYXR0cnMubnMuYnMubGF5b3V0O1xuICAgICAgICB0aGlzLmZpZWxkcyA9IGF0dHJzLm5zLmJzLmZpZWxkcyB8fCBbXTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJvd0NsaWNrZWRcbiAgICAgKi9cbiAgICByb3dDbGlja2VkKGUpIHtcblxuICAgICAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLm5zKVxuICAgICAgICAgICAgaWYgKHRoaXMuYXR0cmlidXRlcy5ucy5icy5vblJvd0NsaWNrZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLm5zLmJzLm9uUm93Q2xpY2tlZChlLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2xheW91dCkgdGhyb3cgbmV3IEVycm9yKCdUYWJsZTogTGF5b3V0IG5vdCBzcGVjaWZpZWQhJyk7XG5cbiAgICAgICAgcmV0dXJuIChuZXcgVmlldyh0aGlzLl9sYXlvdXQsIHRoaXMpKS5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuZXhwb3J0IGRlZmF1bHQgVGFibGVcbiJdfQ==