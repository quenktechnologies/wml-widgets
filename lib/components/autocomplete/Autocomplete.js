'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _nop = require('nop');

var _nop2 = _interopRequireDefault(_nop);

var _layout = require('./wml/layout.wml');

var _layout2 = _interopRequireDefault(_layout);

var _RestDelegate = require('./RestDelegate');

var _RestDelegate2 = _interopRequireDefault(_RestDelegate);

var _SearchDelegate = require('./SearchDelegate');

var _SearchDelegate2 = _interopRequireDefault(_SearchDelegate);

var _SelectionDelegate = require('./SelectionDelegate');

var _SelectionDelegate2 = _interopRequireDefault(_SelectionDelegate);

var _PopulatedDelegate = require('./PopulatedDelegate');

var _PopulatedDelegate2 = _interopRequireDefault(_PopulatedDelegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Autocomplete = function (_Widget) {
    _inherits(Autocomplete, _Widget);

    function Autocomplete(attrs, children) {
        _classCallCheck(this, Autocomplete);

        var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, attrs, children));

        _this.choice = null;
        _this.view = new _runtime.View(_layout2.default, _this);
        _this.restDelegate = new _RestDelegate2.default(_this);
        _this.searchDelegate = new _SearchDelegate2.default(_this);
        _this.selectionDelegate = new _SelectionDelegate2.default(_this);
        _this.populatedDelegate = new _PopulatedDelegate2.default(_this);
        _this.delegate = null;

        _this.search = (0, _lodash2.default)(function (input) {

            attrs.read('wat:search', _nop2.default)(input.value, _this);
        }, 500);

        return _this;
    }

    _createClass(Autocomplete, [{
        key: 'onRendered',
        value: function onRendered() {

            document.addEventListener('click', this);
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(e) {

            if (!this.view.findById('root').contains(e.target)) {
                this.toRest();
            }

            if (!document.body.contains(this.view.findById('root'))) document.removeEventListener('click', this);
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            this.delegate.handleKeyUp(e);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            this.delegate.handleKeyDown(e);
        }
    }, {
        key: 'handleInput',
        value: function handleInput(e) {

            //For compatability reasons
            e.target.onkeydown = null;
            this.handleKeyDown(e);
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            this.delegate.selected(index);
        }

        /**
         * toRest makes the Autocomplete behave.
         */

    }, {
        key: 'toRest',
        value: function toRest() {

            this.delegate = this.restDelegate;
            this.delegate.render();
        }

        /**
         * toSearch transitions the Autocomplete to the search phase.
         */

    }, {
        key: 'toSearch',
        value: function toSearch() {

            this.delegate = this.searchDelegate;
            this.delegate.render();
        }

        /**
         * toSelection transitions the autocomplete to the selection phase
         */

    }, {
        key: 'toSelection',
        value: function toSelection() {

            this.delegate = this.selectionDelegate;
            this.delegate.render();
        }

        /**
         * toPopulated transitions the autocomplete to a populate state
         * if is initialized with a value
         */

    }, {
        key: 'toPopulated',
        value: function toPopulated() {

            this.delegate = this.populatedDelegate;
            this.delegate.render();
        }

        /**
         * update the options displayed to the user
         * @param {array<object>} items
         */

    }, {
        key: 'update',
        value: function update(items) {

            this.delegate.update(items);
        }

        /**
         * set the value of the input
         * @param {string} value
         * @returns {Autocomplete}
         */

    }, {
        key: 'set',
        value: function set(value) {

            this.view.findById('input').value = value;
            return this;
        }
    }, {
        key: 'render',
        value: function render() {

            var tree = this.view.render();
            this.delegate = this.attributes.read('wat:value') ? this.populatedDelegate : this.restDelegate;
            this.delegate.render();
            return tree;
        }
    }]);

    return Autocomplete;
}(_runtime.Widget);

exports.default = Autocomplete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9BdXRvY29tcGxldGUuanMiXSwibmFtZXMiOlsiQXV0b2NvbXBsZXRlIiwiYXR0cnMiLCJjaGlsZHJlbiIsImNob2ljZSIsInZpZXciLCJyZXN0RGVsZWdhdGUiLCJzZWFyY2hEZWxlZ2F0ZSIsInNlbGVjdGlvbkRlbGVnYXRlIiwicG9wdWxhdGVkRGVsZWdhdGUiLCJkZWxlZ2F0ZSIsInNlYXJjaCIsInJlYWQiLCJpbnB1dCIsInZhbHVlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImZpbmRCeUlkIiwiY29udGFpbnMiLCJ0YXJnZXQiLCJ0b1Jlc3QiLCJib2R5IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZUtleVVwIiwiaGFuZGxlS2V5RG93biIsIm9ua2V5ZG93biIsImluZGV4Iiwic2VsZWN0ZWQiLCJyZW5kZXIiLCJpdGVtcyIsInVwZGF0ZSIsInRyZWUiLCJhdHRyaWJ1dGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxZOzs7QUFFRiwwQkFBWUMsS0FBWixFQUFtQkMsUUFBbkIsRUFBNkI7QUFBQTs7QUFBQSxnSUFFbkJELEtBRm1CLEVBRVpDLFFBRlk7O0FBSXpCLGNBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsY0FBS0MsSUFBTCxHQUFZLDBDQUFaO0FBQ0EsY0FBS0MsWUFBTCxHQUFvQixpQ0FBcEI7QUFDQSxjQUFLQyxjQUFMLEdBQXNCLG1DQUF0QjtBQUNBLGNBQUtDLGlCQUFMLEdBQXlCLHNDQUF6QjtBQUNBLGNBQUtDLGlCQUFMLEdBQXlCLHNDQUF6QjtBQUNBLGNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUEsY0FBS0MsTUFBTCxHQUFjLHNCQUFTLGlCQUFTOztBQUU1QlQsa0JBQU1VLElBQU4sQ0FBVyxZQUFYLGlCQUE4QkMsTUFBTUMsS0FBcEM7QUFFSCxTQUphLEVBSVgsR0FKVyxDQUFkOztBQVp5QjtBQWtCNUI7Ozs7cUNBRVk7O0FBRVRDLHFCQUFTQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxJQUFuQztBQUVIOzs7b0NBRVdDLEMsRUFBRzs7QUFFWCxnQkFBSSxDQUFDLEtBQUtaLElBQUwsQ0FBVWEsUUFBVixDQUFtQixNQUFuQixFQUEyQkMsUUFBM0IsQ0FBb0NGLEVBQUVHLE1BQXRDLENBQUwsRUFBb0Q7QUFDaEQscUJBQUtDLE1BQUw7QUFDSDs7QUFFRCxnQkFBSSxDQUFDTixTQUFTTyxJQUFULENBQWNILFFBQWQsQ0FBdUIsS0FBS2QsSUFBTCxDQUFVYSxRQUFWLENBQW1CLE1BQW5CLENBQXZCLENBQUwsRUFDSUgsU0FBU1EsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsSUFBdEM7QUFFUDs7O29DQUVXTixDLEVBQUc7O0FBRVgsaUJBQUtQLFFBQUwsQ0FBY2MsV0FBZCxDQUEwQlAsQ0FBMUI7QUFFSDs7O3NDQUVhQSxDLEVBQUc7O0FBRWIsaUJBQUtQLFFBQUwsQ0FBY2UsYUFBZCxDQUE0QlIsQ0FBNUI7QUFFSDs7O29DQUVXQSxDLEVBQUc7O0FBRVg7QUFDQUEsY0FBRUcsTUFBRixDQUFTTSxTQUFULEdBQXFCLElBQXJCO0FBQ0EsaUJBQUtELGFBQUwsQ0FBbUJSLENBQW5CO0FBRUg7O0FBRUQ7Ozs7Ozs7aUNBSVNVLEssRUFBTzs7QUFFWixpQkFBS2pCLFFBQUwsQ0FBY2tCLFFBQWQsQ0FBdUJELEtBQXZCO0FBRUg7O0FBRUQ7Ozs7OztpQ0FHUzs7QUFFTCxpQkFBS2pCLFFBQUwsR0FBZ0IsS0FBS0osWUFBckI7QUFDQSxpQkFBS0ksUUFBTCxDQUFjbUIsTUFBZDtBQUVIOztBQUVEOzs7Ozs7bUNBR1c7O0FBRVAsaUJBQUtuQixRQUFMLEdBQWdCLEtBQUtILGNBQXJCO0FBQ0EsaUJBQUtHLFFBQUwsQ0FBY21CLE1BQWQ7QUFFSDs7QUFFRDs7Ozs7O3NDQUdjOztBQUVWLGlCQUFLbkIsUUFBTCxHQUFnQixLQUFLRixpQkFBckI7QUFDQSxpQkFBS0UsUUFBTCxDQUFjbUIsTUFBZDtBQUVIOztBQUVEOzs7Ozs7O3NDQUljOztBQUVWLGlCQUFLbkIsUUFBTCxHQUFnQixLQUFLRCxpQkFBckI7QUFDQSxpQkFBS0MsUUFBTCxDQUFjbUIsTUFBZDtBQUVIOztBQUVEOzs7Ozs7OytCQUlPQyxLLEVBQU87O0FBRVYsaUJBQUtwQixRQUFMLENBQWNxQixNQUFkLENBQXFCRCxLQUFyQjtBQUVIOztBQUVEOzs7Ozs7Ozs0QkFLSWhCLEssRUFBTzs7QUFFUCxpQkFBS1QsSUFBTCxDQUFVYSxRQUFWLENBQW1CLE9BQW5CLEVBQTRCSixLQUE1QixHQUFvQ0EsS0FBcEM7QUFDQSxtQkFBTyxJQUFQO0FBRUg7OztpQ0FFUTs7QUFFTCxnQkFBSWtCLE9BQU8sS0FBSzNCLElBQUwsQ0FBVXdCLE1BQVYsRUFBWDtBQUNBLGlCQUFLbkIsUUFBTCxHQUFpQixLQUFLdUIsVUFBTCxDQUFnQnJCLElBQWhCLENBQXFCLFdBQXJCLENBQUQsR0FBc0MsS0FBS0gsaUJBQTNDLEdBQStELEtBQUtILFlBQXBGO0FBQ0EsaUJBQUtJLFFBQUwsQ0FBY21CLE1BQWQ7QUFDQSxtQkFBT0csSUFBUDtBQUVIOzs7Ozs7a0JBSVUvQixZIiwiZmlsZSI6IkF1dG9jb21wbGV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcsIFdpZGdldCB9IGZyb20gJ3dtbGpzL2xpYi9ydW50aW1lJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICdwcm9wZXJ0eS1zZWVrJztcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gudGhyb3R0bGUnO1xuaW1wb3J0IG5vcCBmcm9tICdub3AnO1xuaW1wb3J0IGxheW91dCBmcm9tICcuL3dtbC9sYXlvdXQud21sJztcbmltcG9ydCBSZXN0RGVsZWdhdGUgZnJvbSAnLi9SZXN0RGVsZWdhdGUnO1xuaW1wb3J0IFNlYXJjaERlbGVnYXRlIGZyb20gJy4vU2VhcmNoRGVsZWdhdGUnO1xuaW1wb3J0IFNlbGVjdGlvbkRlbGVnYXRlIGZyb20gJy4vU2VsZWN0aW9uRGVsZWdhdGUnO1xuaW1wb3J0IFBvcHVsYXRlZERlbGVnYXRlIGZyb20gJy4vUG9wdWxhdGVkRGVsZWdhdGUnO1xuXG5jbGFzcyBBdXRvY29tcGxldGUgZXh0ZW5kcyBXaWRnZXQge1xuXG4gICAgY29uc3RydWN0b3IoYXR0cnMsIGNoaWxkcmVuKSB7XG5cbiAgICAgICAgc3VwZXIoYXR0cnMsIGNoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLmNob2ljZSA9IG51bGw7XG4gICAgICAgIHRoaXMudmlldyA9IG5ldyBWaWV3KGxheW91dCwgdGhpcyk7XG4gICAgICAgIHRoaXMucmVzdERlbGVnYXRlID0gbmV3IFJlc3REZWxlZ2F0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5zZWFyY2hEZWxlZ2F0ZSA9IG5ldyBTZWFyY2hEZWxlZ2F0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25EZWxlZ2F0ZSA9IG5ldyBTZWxlY3Rpb25EZWxlZ2F0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZWREZWxlZ2F0ZSA9IG5ldyBQb3B1bGF0ZWREZWxlZ2F0ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zZWFyY2ggPSB0aHJvdHRsZShpbnB1dCA9PiB7XG5cbiAgICAgICAgICAgIGF0dHJzLnJlYWQoJ3dhdDpzZWFyY2gnLCBub3ApKGlucHV0LnZhbHVlLCB0aGlzKTtcblxuICAgICAgICB9LCA1MDApO1xuXG4gICAgfVxuXG4gICAgb25SZW5kZXJlZCgpIHtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnQoZSkge1xuXG4gICAgICAgIGlmICghdGhpcy52aWV3LmZpbmRCeUlkKCdyb290JykuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnRvUmVzdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMudmlldy5maW5kQnlJZCgncm9vdCcpKSlcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlVcChlKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5oYW5kbGVLZXlVcChlKTtcblxuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZSkge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUuaGFuZGxlS2V5RG93bihlKTtcblxuICAgIH1cblxuICAgIGhhbmRsZUlucHV0KGUpIHtcblxuICAgICAgICAvL0ZvciBjb21wYXRhYmlsaXR5IHJlYXNvbnNcbiAgICAgICAgZS50YXJnZXQub25rZXlkb3duID0gbnVsbDtcbiAgICAgICAgdGhpcy5oYW5kbGVLZXlEb3duKGUpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VsZWN0ZWQgaXMgY2FsbGVkIHdoZW4gYW4gb3B0aW9uIGhhcyBiZWVuIGNsaWNrZWQgb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RlZChpbmRleCkge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUuc2VsZWN0ZWQoaW5kZXgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdG9SZXN0IG1ha2VzIHRoZSBBdXRvY29tcGxldGUgYmVoYXZlLlxuICAgICAqL1xuICAgIHRvUmVzdCgpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdGhpcy5yZXN0RGVsZWdhdGU7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0b1NlYXJjaCB0cmFuc2l0aW9ucyB0aGUgQXV0b2NvbXBsZXRlIHRvIHRoZSBzZWFyY2ggcGhhc2UuXG4gICAgICovXG4gICAgdG9TZWFyY2goKSB7XG5cbiAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHRoaXMuc2VhcmNoRGVsZWdhdGU7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucmVuZGVyKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0b1NlbGVjdGlvbiB0cmFuc2l0aW9ucyB0aGUgYXV0b2NvbXBsZXRlIHRvIHRoZSBzZWxlY3Rpb24gcGhhc2VcbiAgICAgKi9cbiAgICB0b1NlbGVjdGlvbigpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlID0gdGhpcy5zZWxlY3Rpb25EZWxlZ2F0ZTtcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZS5yZW5kZXIoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHRvUG9wdWxhdGVkIHRyYW5zaXRpb25zIHRoZSBhdXRvY29tcGxldGUgdG8gYSBwb3B1bGF0ZSBzdGF0ZVxuICAgICAqIGlmIGlzIGluaXRpYWxpemVkIHdpdGggYSB2YWx1ZVxuICAgICAqL1xuICAgIHRvUG9wdWxhdGVkKCkge1xuXG4gICAgICAgIHRoaXMuZGVsZWdhdGUgPSB0aGlzLnBvcHVsYXRlZERlbGVnYXRlO1xuICAgICAgICB0aGlzLmRlbGVnYXRlLnJlbmRlcigpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHRoZSBvcHRpb25zIGRpc3BsYXllZCB0byB0aGUgdXNlclxuICAgICAqIEBwYXJhbSB7YXJyYXk8b2JqZWN0Pn0gaXRlbXNcbiAgICAgKi9cbiAgICB1cGRhdGUoaXRlbXMpIHtcblxuICAgICAgICB0aGlzLmRlbGVnYXRlLnVwZGF0ZShpdGVtcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtBdXRvY29tcGxldGV9XG4gICAgICovXG4gICAgc2V0KHZhbHVlKSB7XG5cbiAgICAgICAgdGhpcy52aWV3LmZpbmRCeUlkKCdpbnB1dCcpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIHZhciB0cmVlID0gdGhpcy52aWV3LnJlbmRlcigpO1xuICAgICAgICB0aGlzLmRlbGVnYXRlID0gKHRoaXMuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWUnKSkgPyB0aGlzLnBvcHVsYXRlZERlbGVnYXRlIDogdGhpcy5yZXN0RGVsZWdhdGU7XG4gICAgICAgIHRoaXMuZGVsZWdhdGUucmVuZGVyKCk7XG4gICAgICAgIHJldHVybiB0cmVlO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1dG9jb21wbGV0ZVxuIl19