import * as views from './wml/toolbar';

import { View, Component } from '@quenk/wml';

import { concat } from '../../util';
import { WidgetAttrs, HTMLElementAttrs, getId, getClassName } from '../../';

///classNames:begin
export const TOOLBAR = 'ww-toolbar';
export const TOOLBAR_COMPAT = '-toolbar-compat';
///classNames:end

/**
 * ToolbarAttrs
 */
export interface ToolbarAttrs extends HTMLElementAttrs { }

/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
export class Toolbar extends Component<WidgetAttrs<ToolbarAttrs>> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: getId(this.attrs),

            className: concat(TOOLBAR, getClassName(this.attrs))

        }

    }

}
