"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangedPager = exports.RANGED_PAGER_PAGE = exports.RANGED_PAGER = void 0;
const wml_1 = require("@quenk/wml");
const array_1 = require("@quenk/noni/lib/data/array");
const active_1 = require("../../content/state/active");
const util_1 = require("../../util");
const __1 = require("../../");
const pager_1 = require("../pager");
const views_1 = require("./views");
///classNames:begin
exports.RANGED_PAGER = 'ww-ranged-pager';
exports.RANGED_PAGER_PAGE = 'ww-ranged-pager__page';
/**
 * RangedPager provides a variant of the [[Pager]] control that provides
 * additional buttons for selecting specific pages.
 */
class RangedPager extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.RangedPagerView(this);
        this.values = {
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.RANGED_PAGER, this.attrs.className),
            current: this.attrs.current || 1,
            total: this.attrs.total || 1,
            pages: paginate(this.attrs.max || this.attrs.total || 1, this.attrs.total || 1, this.attrs.current || 1),
            onChange: (e) => {
                this.values.current = e.value;
                this.fire();
            },
            page: {
                getClassName: (i) => (0, util_1.concat)(exports.RANGED_PAGER_PAGE, (i === this.values.current) ? active_1.ACTIVE : ''),
                onClick: (i) => {
                    this.values.current = i;
                    this.fire();
                }
            },
        };
    }
    /**
     * @private
     */
    fire() {
        // XXX: There is a bug in wml that prevents invalidating a view whose
        // root is another wml widget. This view will not have a parent element 
        // so we must invalidate the Pager view.
        (0, util_1.getById)(this.view, "pager").map(w => w.view.invalidate());
        if (this.attrs.onChange)
            this.attrs.onChange(new pager_1.PageSelectedEvent(this.attrs.name || '', this.values.current));
    }
}
exports.RangedPager = RangedPager;
const paginate = (max, total, current) => {
    let allPages = (0, array_1.make)(total, i => i + 1);
    if (allPages.length <= max)
        return allPages;
    // The total distance from the current to end in both direction accouting
    // for the fact that the start, current and end pages must be present. This
    // is the real number of spaces we have for pages.
    let totalAllowed = max - 3;
    let distanceOneWay = Math.floor(totalAllowed / 2);
    //Calculate the distance from current -> start we will allow. When the 
    //number of spaces available is not even, we give the extra page to start.
    let startDistance = distanceOneWay + (totalAllowed % 2);
    let distanceFromStart = current - 1;
    // The remaining number of pages once all the pages from current back to
    // start have been filled. This can be negative indicating start-current
    // will not fit in distanceOneWay.
    let startRemainder = startDistance - distanceFromStart;
    //Calculate the distance from current -> end we will allow. Anything leftover
    //from  startDistance is added here.
    let endDistance = (startRemainder > 0) ?
        distanceOneWay + startRemainder :
        distanceOneWay;
    let distanceFromEnd = total - current;
    let endRemainder = endDistance - distanceFromEnd;
    // If we have a remainder here, we can give it back to current -> start.
    if (endRemainder > 0)
        startDistance = startDistance + endRemainder;
    return allPages.map(page => {
        if (((page < current) && (page != 1)) &&
            ((current - page) >= startDistance))
            return 0;
        if (((page > current) && (page != total)) &&
            ((page - current) >= endDistance))
            return 0;
        return page;
    }).filter((page, idx, list) => ((list[idx - 1] === 0) && (page === 0)) ? false : true);
};
//# sourceMappingURL=index.js.map