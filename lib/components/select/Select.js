'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _runtime = require('wmljs/lib/runtime');

var _Input2 = require('../input/Input');

var _Input3 = _interopRequireDefault(_Input2);

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Input) {
    _inherits(Select, _Input);

    function Select(attrs, children) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, attrs, children));

        _this.view = new _runtime.View(_layout2.default, _this);

        return _this;
    }

    return Select;
}(_Input3.default);

exports.default = Select;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdC9TZWxlY3QuanMiXSwibmFtZXMiOlsiU2VsZWN0IiwiYXR0cnMiLCJjaGlsZHJlbiIsInZpZXciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxNOzs7QUFFRixvQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxvSEFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBR3pCLGNBQUtDLElBQUwsR0FBWSwwQ0FBWjs7QUFIeUI7QUFLNUI7Ozs7O2tCQUlVSCxNIiwiZmlsZSI6IlNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICd3bWxqcy9saWIvcnVudGltZSc7XG5pbXBvcnQgSW5wdXQgZnJvbSAnLi4vaW5wdXQvSW5wdXQnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcblxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgSW5wdXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcbiAgICAgICAgdGhpcy52aWV3ID0gbmV3IFZpZXcobGF5b3V0LCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RcbiJdfQ==