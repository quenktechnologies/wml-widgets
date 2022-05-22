"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangedPager = exports.RANGED_PAGER_PAGE = exports.RANGED_PAGER = void 0;
var wml_1 = require("@quenk/wml");
var array_1 = require("@quenk/noni/lib/data/array");
var active_1 = require("../../content/state/active");
var util_1 = require("../../util");
var __1 = require("../../");
var pager_1 = require("../pager");
var views_1 = require("./views");
///classNames:begin
exports.RANGED_PAGER = 'ww-ranged-pager';
exports.RANGED_PAGER_PAGE = 'ww-ranged-pager__page';
/**
 * RangedPager provides a variant of the [[Pager]] control that provides
 * additional buttons for selecting specific pages.
 */
var RangedPager = /** @class */ (function (_super) {
    __extends(RangedPager, _super);
    function RangedPager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views_1.RangedPagerView(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.RANGED_PAGER, _this.attrs.className),
            current: _this.attrs.current || 1,
            total: _this.attrs.total || 1,
            pages: paginate(_this.attrs.max || _this.attrs.total || 1, _this.attrs.total || 1, _this.attrs.current || 1),
            onChange: function (e) {
                _this.values.current = e.value;
                _this.fire();
            },
            page: {
                getClassName: function (i) { return util_1.concat(exports.RANGED_PAGER_PAGE, (i === _this.values.current) ? active_1.ACTIVE : ''); },
                onClick: function (i) {
                    _this.values.current = i;
                    _this.fire();
                }
            },
        };
        return _this;
    }
    /**
     * @private
     */
    RangedPager.prototype.fire = function () {
        // XXX: There is a bug in wml that prevents invalidating a view whose
        // root is another wml widget. This view will not have a parent element 
        // so we must invalidate the Pager view.
        util_1.getById(this.view, "pager").map(function (w) { return w.view.invalidate(); });
        if (this.attrs.onChange)
            this.attrs.onChange(new pager_1.PageSelectedEvent(this.attrs.name || '', this.values.current));
    };
    return RangedPager;
}(wml_1.Component));
exports.RangedPager = RangedPager;
var paginate = function (max, total, current) {
    var allPages = array_1.make(total, function (i) { return i + 1; });
    if (allPages.length <= max)
        return allPages;
    // The total distance from the current to end in both direction accouting
    // for the fact that the start, current and end pages must be present. This
    // is the real number of spaces we have for pages.
    var totalAllowed = max - 3;
    var distanceOneWay = Math.floor(totalAllowed / 2);
    //Calculate the distance from current -> start we will allow. When the 
    //number of spaces available is not even, we give the extra page to start.
    var startDistance = distanceOneWay + (totalAllowed % 2);
    var distanceFromStart = current - 1;
    // The remaining number of pages once all the pages from current back to
    // start have been filled. This can be negative indicating start-current
    // will not fit in distanceOneWay.
    var startRemainder = startDistance - distanceFromStart;
    //Calculate the distance from current -> end we will allow. Anything leftover
    //from  startDistance is added here.
    var endDistance = (startRemainder > 0) ?
        distanceOneWay + startRemainder :
        distanceOneWay;
    var distanceFromEnd = total - current;
    var endRemainder = endDistance - distanceFromEnd;
    // If we have a remainder here, we can give it back to current -> start.
    if (endRemainder > 0)
        startDistance = startDistance + endRemainder;
    return allPages.map(function (page) {
        if (((page < current) && (page != 1)) &&
            ((current - page) >= startDistance))
            return 0;
        if (((page > current) && (page != total)) &&
            ((page - current) >= endDistance))
            return 0;
        return page;
    }).filter(function (page, idx, list) {
        return ((list[idx - 1] === 0) && (page === 0)) ? false : true;
    });
};
//# sourceMappingURL=index.js.map