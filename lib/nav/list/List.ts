import * as names from '@package/self/common/names';
import * as util from '@package/self/common/util';
import * as views from './wml/list';
import * as wml from '@quenk/wml';

export interface ListAttrs extends wml.Attrs {

    ww?: {

        /**
         * class or classes for the <ul> element.
         */
        class?: string

    }

}

/**
 * List of navigation links.
 */
export class List extends wml.Component<ListAttrs> {

  view: wml.View = new views.Main(this);

    values = {

        class: {

            root: util.concat(names.NAV_LIST,
                this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
