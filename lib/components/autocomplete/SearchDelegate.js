'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runtime = require('wmljs/lib/runtime');

var _propertySeek = require('property-seek');

var _propertySeek2 = _interopRequireDefault(_propertySeek);

var _beof = require('beof');

var _beof2 = _interopRequireDefault(_beof);

var _watClasses = require('wat-classes');

var Class = _interopRequireWildcard(_watClasses);

var _nop = require('nop');

var _nop2 = _interopRequireDefault(_nop);

var _AutocompleteDelegate2 = require('./AutocompleteDelegate');

var _AutocompleteDelegate3 = _interopRequireDefault(_AutocompleteDelegate2);

var _options = require('./wml/options.wml');

var _options2 = _interopRequireDefault(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * SearchDelegate for the searching phase.
 */
var SearchDelegate = function (_AutocompleteDelegate) {
    _inherits(SearchDelegate, _AutocompleteDelegate);

    function SearchDelegate(auto) {
        _classCallCheck(this, SearchDelegate);

        var _this = _possibleConstructorReturn(this, (SearchDelegate.__proto__ || Object.getPrototypeOf(SearchDelegate)).call(this, auto));

        _this.optionsView = new _runtime.View(_options2.default, _this);
        _this.options = [];
        _this.picked = [];

        return _this;
    }

    _createClass(SearchDelegate, [{
        key: 'update',
        value: function update(items) {

            (0, _beof2.default)({ items: items }).optional().array();

            this.options = items;
            this.render();
        }
    }, {
        key: 'handleKeyUp',
        value: function handleKeyUp(e) {

            if (e.keyCode === 27) {
                e.target.blur();
                this.autocomplete.toRest();
            }
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {

            //@todo throttle searches?
            if (e.keyCode !== 27) this.autocomplete.search(e.target);
        }

        /**
         * selected is called when an option has been clicked on
         * @param {number} index
         */

    }, {
        key: 'selected',
        value: function selected(index) {

            var choice = this.options[index];
            var display = '';

            this.autocomplete.attributes.read('wat:set', function () {})(this.autocomplete.attributes.read('wat:name'), this.autocomplete.attributes.read('wat:valueField') ? (0, _propertySeek2.default)(this.options[index], this.autocomplete.attributes.read('wat:valueField')) : this.options[index], this.autocomplete);

            if (this.autocomplete.attributes.read('wat:updateText', true)) {

                if (this.autocomplete.attributes.read('wat:labelField')) {
                    display = (0, _propertySeek2.default)(choice, this.autocomplete.attributes.read('wat:labelField'));
                } else if (this.autocomplete.attributes.read('wat:valueField')) {
                    display = (0, _propertySeek2.default)(choice, this.autocomplete.attributes.read('wat:valueField'));
                } else {
                    display = choice;
                }

                this.autocomplete.set(display);
                this.autocomplete.choice = choice;
            }

            this.autocomplete.toSelection();
        }
    }, {
        key: 'render',
        value: function render() {

            var options = this.autocomplete.view.findById('options');

            while (options.lastChild) {
                options.removeChild(options.lastChild);
            }options.classList.toggle(Class.WAT_VISIBLE);
            options.appendChild(this.optionsView.render(), this);
        }
    }]);

    return SearchDelegate;
}(_AutocompleteDelegate3.default);

exports.default = SearchDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS9TZWFyY2hEZWxlZ2F0ZS5qcyJdLCJuYW1lcyI6WyJDbGFzcyIsIlNlYXJjaERlbGVnYXRlIiwiYXV0byIsIm9wdGlvbnNWaWV3Iiwib3B0aW9ucyIsInBpY2tlZCIsIml0ZW1zIiwib3B0aW9uYWwiLCJhcnJheSIsInJlbmRlciIsImUiLCJrZXlDb2RlIiwidGFyZ2V0IiwiYmx1ciIsImF1dG9jb21wbGV0ZSIsInRvUmVzdCIsInNlYXJjaCIsImluZGV4IiwiY2hvaWNlIiwiZGlzcGxheSIsImF0dHJpYnV0ZXMiLCJyZWFkIiwic2V0IiwidG9TZWxlY3Rpb24iLCJ2aWV3IiwiZmluZEJ5SWQiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIldBVF9WSVNJQkxFIiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztJQUFZQSxLOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01DLGM7OztBQUVGLDRCQUFZQyxJQUFaLEVBQWtCO0FBQUE7O0FBQUEsb0lBRVJBLElBRlE7O0FBSWQsY0FBS0MsV0FBTCxHQUFtQiwyQ0FBbkI7QUFDQSxjQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLGNBQUtDLE1BQUwsR0FBYyxFQUFkOztBQU5jO0FBUWpCOzs7OytCQUVNQyxLLEVBQU87O0FBRVYsZ0NBQUssRUFBRUEsWUFBRixFQUFMLEVBQWdCQyxRQUFoQixHQUEyQkMsS0FBM0I7O0FBRUEsaUJBQUtKLE9BQUwsR0FBZUUsS0FBZjtBQUNBLGlCQUFLRyxNQUFMO0FBRUg7OztvQ0FFV0MsQyxFQUFHOztBQUVYLGdCQUFJQSxFQUFFQyxPQUFGLEtBQWMsRUFBbEIsRUFBc0I7QUFDbEJELGtCQUFFRSxNQUFGLENBQVNDLElBQVQ7QUFDQSxxQkFBS0MsWUFBTCxDQUFrQkMsTUFBbEI7QUFDSDtBQUVKOzs7c0NBRWFMLEMsRUFBRzs7QUFFYjtBQUNBLGdCQUFJQSxFQUFFQyxPQUFGLEtBQWMsRUFBbEIsRUFDSSxLQUFLRyxZQUFMLENBQWtCRSxNQUFsQixDQUF5Qk4sRUFBRUUsTUFBM0I7QUFFUDs7QUFFRDs7Ozs7OztpQ0FJU0ssSyxFQUFPOztBQUVaLGdCQUFJQyxTQUFTLEtBQUtkLE9BQUwsQ0FBYWEsS0FBYixDQUFiO0FBQ0EsZ0JBQUlFLFVBQVUsRUFBZDs7QUFFQSxpQkFBS0wsWUFBTCxDQUFrQk0sVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLFNBQWxDLEVBQTZDLFlBQVcsQ0FBRSxDQUExRCxFQUVJLEtBQUtQLFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxVQUFsQyxDQUZKLEVBR0ssS0FBS1AsWUFBTCxDQUFrQk0sVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxDQUFELEdBQ0EsNEJBQVMsS0FBS2pCLE9BQUwsQ0FBYWEsS0FBYixDQUFULEVBQThCLEtBQUtILFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxnQkFBbEMsQ0FBOUIsQ0FEQSxHQUVBLEtBQUtqQixPQUFMLENBQWFhLEtBQWIsQ0FMSixFQUt5QixLQUFLSCxZQUw5Qjs7QUFPQSxnQkFBSSxLQUFLQSxZQUFMLENBQWtCTSxVQUFsQixDQUE2QkMsSUFBN0IsQ0FBa0MsZ0JBQWxDLEVBQW9ELElBQXBELENBQUosRUFBK0Q7O0FBRTNELG9CQUFJLEtBQUtQLFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxnQkFBbEMsQ0FBSixFQUF5RDtBQUNyREYsOEJBQVUsNEJBQVNELE1BQVQsRUFBaUIsS0FBS0osWUFBTCxDQUFrQk0sVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxDQUFqQixDQUFWO0FBQ0gsaUJBRkQsTUFFTyxJQUFJLEtBQUtQLFlBQUwsQ0FBa0JNLFVBQWxCLENBQTZCQyxJQUE3QixDQUFrQyxnQkFBbEMsQ0FBSixFQUF5RDtBQUM1REYsOEJBQVUsNEJBQVNELE1BQVQsRUFBaUIsS0FBS0osWUFBTCxDQUFrQk0sVUFBbEIsQ0FBNkJDLElBQTdCLENBQWtDLGdCQUFsQyxDQUFqQixDQUFWO0FBQ0gsaUJBRk0sTUFFQTtBQUNIRiw4QkFBVUQsTUFBVjtBQUNIOztBQUVELHFCQUFLSixZQUFMLENBQWtCUSxHQUFsQixDQUFzQkgsT0FBdEI7QUFDQSxxQkFBS0wsWUFBTCxDQUFrQkksTUFBbEIsR0FBMkJBLE1BQTNCO0FBRUg7O0FBRUQsaUJBQUtKLFlBQUwsQ0FBa0JTLFdBQWxCO0FBRUg7OztpQ0FFUTs7QUFFTCxnQkFBSW5CLFVBQVUsS0FBS1UsWUFBTCxDQUFrQlUsSUFBbEIsQ0FBdUJDLFFBQXZCLENBQWdDLFNBQWhDLENBQWQ7O0FBRUEsbUJBQU9yQixRQUFRc0IsU0FBZjtBQUNJdEIsd0JBQVF1QixXQUFSLENBQW9CdkIsUUFBUXNCLFNBQTVCO0FBREosYUFHQXRCLFFBQVF3QixTQUFSLENBQWtCQyxNQUFsQixDQUF5QjdCLE1BQU04QixXQUEvQjtBQUNBMUIsb0JBQVEyQixXQUFSLENBQW9CLEtBQUs1QixXQUFMLENBQWlCTSxNQUFqQixFQUFwQixFQUErQyxJQUEvQztBQUVIOzs7Ozs7a0JBSVVSLGMiLCJmaWxlIjoiU2VhcmNoRGVsZWdhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnd21sanMvbGliL3J1bnRpbWUnO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gJ3Byb3BlcnR5LXNlZWsnO1xuaW1wb3J0IGJlb2YgZnJvbSAnYmVvZic7XG5pbXBvcnQgKiBhcyBDbGFzcyBmcm9tICd3YXQtY2xhc3Nlcyc7XG5pbXBvcnQgbm9wIGZyb20gJ25vcCc7XG5pbXBvcnQgQXV0b2NvbXBsZXRlRGVsZWdhdGUgZnJvbSAnLi9BdXRvY29tcGxldGVEZWxlZ2F0ZSc7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL3dtbC9vcHRpb25zLndtbCc7XG5cbi8qKlxuICogU2VhcmNoRGVsZWdhdGUgZm9yIHRoZSBzZWFyY2hpbmcgcGhhc2UuXG4gKi9cbmNsYXNzIFNlYXJjaERlbGVnYXRlIGV4dGVuZHMgQXV0b2NvbXBsZXRlRGVsZWdhdGUge1xuXG4gICAgY29uc3RydWN0b3IoYXV0bykge1xuXG4gICAgICAgIHN1cGVyKGF1dG8pO1xuXG4gICAgICAgIHRoaXMub3B0aW9uc1ZpZXcgPSBuZXcgVmlldyhvcHRpb25zLCB0aGlzKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gW107XG4gICAgICAgIHRoaXMucGlja2VkID0gW107XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoaXRlbXMpIHtcblxuICAgICAgICBiZW9mKHsgaXRlbXMgfSkub3B0aW9uYWwoKS5hcnJheSgpO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5VXAoZSkge1xuXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBlLnRhcmdldC5ibHVyKCk7XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS50b1Jlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaGFuZGxlS2V5RG93bihlKSB7XG5cbiAgICAgICAgLy9AdG9kbyB0aHJvdHRsZSBzZWFyY2hlcz9cbiAgICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMjcpXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZWFyY2goZS50YXJnZXQpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2VsZWN0ZWQgaXMgY2FsbGVkIHdoZW4gYW4gb3B0aW9uIGhhcyBiZWVuIGNsaWNrZWQgb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RlZChpbmRleCkge1xuXG4gICAgICAgIHZhciBjaG9pY2UgPSB0aGlzLm9wdGlvbnNbaW5kZXhdO1xuICAgICAgICB2YXIgZGlzcGxheSA9ICcnO1xuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLmF0dHJpYnV0ZXMucmVhZCgnd2F0OnNldCcsIGZ1bmN0aW9uKCkge30pKFxuXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpuYW1lJyksXG4gICAgICAgICAgICAodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dmFsdWVGaWVsZCcpKSA/XG4gICAgICAgICAgICBwcm9wZXJ0eSh0aGlzLm9wdGlvbnNbaW5kZXhdLCB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpIDpcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1tpbmRleF0sIHRoaXMuYXV0b2NvbXBsZXRlKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvY29tcGxldGUuYXR0cmlidXRlcy5yZWFkKCd3YXQ6dXBkYXRlVGV4dCcsIHRydWUpKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpsYWJlbEZpZWxkJykpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID0gcHJvcGVydHkoY2hvaWNlLCB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDpsYWJlbEZpZWxkJykpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID0gcHJvcGVydHkoY2hvaWNlLCB0aGlzLmF1dG9jb21wbGV0ZS5hdHRyaWJ1dGVzLnJlYWQoJ3dhdDp2YWx1ZUZpZWxkJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID0gY2hvaWNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5zZXQoZGlzcGxheSk7XG4gICAgICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZS5jaG9pY2UgPSBjaG9pY2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLnRvU2VsZWN0aW9uKCk7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLmF1dG9jb21wbGV0ZS52aWV3LmZpbmRCeUlkKCdvcHRpb25zJyk7XG5cbiAgICAgICAgd2hpbGUgKG9wdGlvbnMubGFzdENoaWxkKVxuICAgICAgICAgICAgb3B0aW9ucy5yZW1vdmVDaGlsZChvcHRpb25zLmxhc3RDaGlsZCk7XG5cbiAgICAgICAgb3B0aW9ucy5jbGFzc0xpc3QudG9nZ2xlKENsYXNzLldBVF9WSVNJQkxFKTtcbiAgICAgICAgb3B0aW9ucy5hcHBlbmRDaGlsZCh0aGlzLm9wdGlvbnNWaWV3LnJlbmRlcigpLCB0aGlzKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hEZWxlZ2F0ZVxuIl19