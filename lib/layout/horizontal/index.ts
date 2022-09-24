import * as wml from '@quenk/wml';
import * as views from './wml/horizontal';

import { LEFT, RIGHT } from '../../content/orientation';
import { concat } from '../../util';
import { HTMLElementAttrs, getClassName } from '../../';

///classNames:begin
export const HORIZONTAL_LAYOUT = 'ww-horizontal-layout';
///classNames:end

/**
 * HorizontalLayoutOrientation
 */
export enum HorizontalLayoutOrientation {

    Left = 'left',

    Right = 'right'

}

/**
 * HorizontalLayoutAttrs
 */
export interface HorizontalLayoutAttrs extends HTMLElementAttrs {

    /**
     * orientation of the items in the layout.
     * Either left or right
     */
    orientation?: HorizontalLayoutOrientation

}

/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
export class HorizontalLayout extends
    wml.Component<HorizontalLayoutAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            id: (this.attrs && this.attrs.id) ? this.attrs.id : '',

            className: concat(HORIZONTAL_LAYOUT,
                getClassName(this.attrs),
                getOrientation(this.attrs))

        }

    }

}

const getOrientation = (attrs: HorizontalLayoutAttrs) =>
    (attrs && attrs.orientation) ?
        attrs.orientation === HorizontalLayoutOrientation.Right ?
            RIGHT : LEFT : '';
