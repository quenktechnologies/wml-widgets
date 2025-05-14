import { View, Component } from '@quenk/wml';

import { make } from '@quenk/noni/lib/data/array';

import { ACTIVE } from '../../content/state/active';
import { concat, getById } from '../../util';
import { getId } from '../../';
import { Pager, PagerAttrs, PageSelectedEvent } from '../pager';
import { RangedPagerView } from './views';

///classNames:begin
export const RANGED_PAGER = 'ww-ranged-pager';
export const RANGED_PAGER_PAGE = 'ww-ranged-pager__page';
///classNames:end

/**
 * MaxPages indicates the maximum number of page options to show.
 */
export type MaxPageOptions = number;

/**
 * RangedPagerAttrs
 */
export interface RangedPagerAttrs extends PagerAttrs {
    /**
     * max number of page options to display.
     *
     * If this is set, and total is more than this value, the layout algorithim
     * will attempt to show page options for as many pages as possible near the
     * current page in both directions.
     *
     * The first, current and last pages are always shown leaving at least max -
     * 3 spaces to fill around the current page. An attempt is made to do this
     * equally on both sides and for this reason, the value of max must be at
     * least 3+2. If not, 5 is used instead.
     *
     * [<-Previous][1][...][59][...][100][Next ->]
     *              1   2    3   4    5
     */
    max?: MaxPageOptions;
}

/**
 * RangedPager provides a variant of the [[Pager]] control that provides
 * additional buttons for selecting specific pages.
 */
export class RangedPager extends Component<RangedPagerAttrs> {
    view: View = new RangedPagerView(this);

    values = {
        id: getId(this.attrs),

        className: concat(RANGED_PAGER, this.attrs.className),

        current: this.attrs.current || 1,

        total: this.attrs.total || 1,

        pages: paginate(
            this.attrs.max || this.attrs.total || 1,
            this.attrs.total || 1,
            this.attrs.current || 1
        ),

        onChange: (e: PageSelectedEvent) => {
            this.values.current = e.value;

            this.fire();
        },

        page: {
            getClassName: (i: number) =>
                concat(
                    RANGED_PAGER_PAGE,
                    i === this.values.current ? ACTIVE : ''
                ),

            onClick: (i: number) => {
                this.values.current = i;

                this.fire();
            }
        }
    };

    /**
     * @private
     */
    fire() {
        // XXX: There is a bug in wml that prevents invalidating a view whose
        // root is another wml widget. This view will not have a parent element
        // so we must invalidate the Pager view.
        getById<Pager>(this.view, 'pager').map(w => w.view.invalidate());

        if (this.attrs.onChange)
            this.attrs.onChange(
                new PageSelectedEvent(
                    this.attrs.name || '',
                    this.values.current
                )
            );
    }
}

const paginate = (max: MaxPageOptions, total: number, current: number) => {
    let allPages = make(total, i => i + 1);

    if (allPages.length <= max) return allPages;

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
    let endDistance =
        startRemainder > 0 ? distanceOneWay + startRemainder : distanceOneWay;

    let distanceFromEnd = total - current;

    let endRemainder = endDistance - distanceFromEnd;

    // If we have a remainder here, we can give it back to current -> start.
    if (endRemainder > 0) startDistance = startDistance + endRemainder;

    return allPages
        .map(page => {
            if (page < current && page != 1 && current - page >= startDistance)
                return 0;

            if (
                page > current &&
                page != total &&
                page - current >= endDistance
            )
                return 0;

            return page;
        })
        .filter((page, idx, list) =>
            list[idx - 1] === 0 && page === 0 ? false : true
        );
};
