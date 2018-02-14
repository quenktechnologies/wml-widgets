import * as wml from '@quenk/wml';
import * as views from './wml/toolbar';
import * as names from '@package/wml-widgets/common/names';
import { concat } from '@package/wml-widgets/common/util';
import { ToolbarAttrs } from '.';

/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
export class Toolbar extends wml.Component<ToolbarAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            class: concat(names.TOOLBAR, this.attrs.ww && this.attrs.ww.class)

        }

    }

}
