'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _modal_body = require('./wml/modal_body.wml');

var _modal_body2 = _interopRequireDefault(_modal_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ModalBody
 */
var ModalBody = function (_Widget) {
    _inherits(ModalBody, _Widget);

    function ModalBody() {
        _classCallCheck(this, ModalBody);

        return _possibleConstructorReturn(this, (ModalBody.__proto__ || Object.getPrototypeOf(ModalBody)).apply(this, arguments));
    }

    _createClass(ModalBody, [{
        key: 'render',
        value: function render() {

            return new _runtime.View(_modal_body2.default, this).render();
        }
    }]);

    return ModalBody;
}(_runtime.Widget);

exports.default = ModalBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFsL01vZGFsQm9keS5qcyJdLCJuYW1lcyI6WyJNb2RhbEJvZHkiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsUzs7Ozs7Ozs7Ozs7aUNBRU87O0FBRUwsbUJBQVEsd0NBQXFCLElBQXJCLENBQUQsQ0FBNkJDLE1BQTdCLEVBQVA7QUFFSDs7Ozs7O2tCQUlVRCxTIiwiZmlsZSI6Ik1vZGFsQm9keS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBtb2RhbF9ib2R5IGZyb20gJy4vd21sL21vZGFsX2JvZHkud21sJztcblxuLyoqXG4gKiBNb2RhbEJvZHlcbiAqL1xuY2xhc3MgTW9kYWxCb2R5IGV4dGVuZHMgV2lkZ2V0IHtcblxuICAgIHJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gKG5ldyBWaWV3KG1vZGFsX2JvZHksIHRoaXMpKS5yZW5kZXIoKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbEJvZHlcbiJdfQ==