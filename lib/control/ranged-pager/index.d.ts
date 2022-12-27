import { View, Component } from '@quenk/wml';
import { PagerAttrs, PageSelectedEvent } from '../pager';
export declare const RANGED_PAGER = "ww-ranged-pager";
export declare const RANGED_PAGER_PAGE = "ww-ranged-pager__page";
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
export declare class RangedPager extends Component<RangedPagerAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        current: number;
        total: number;
        pages: any[];
        onChange: (e: PageSelectedEvent) => void;
        page: {
            getClassName: (i: number) => string;
            onClick: (i: number) => void;
        };
    };
    /**
     * @private
     */
    fire(): void;
}
