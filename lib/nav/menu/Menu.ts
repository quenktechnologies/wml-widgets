import * as names from '@package/wml-widgets/common/names';
import * as util from '@package/wml-widgets/common/util';
import * as views from './wml/menu';
import * as wml from '@quenk/wml';

export interface MenuAttrs extends wml.Attrs {

    ww?: {

        /**
         * class or classes for the <ul> element.
         */
        class?: string

    }

}

/**
 * Menu of navigation links.
 */
export class Menu extends wml.Component<MenuAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        class: {

            root: util.concat(names.NAV_MENU,
                this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
