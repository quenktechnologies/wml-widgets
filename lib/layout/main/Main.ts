import * as views from './wml/main';
import * as names from '../../common/names';
import { concat } from '../../common/util';
import { Renderable } from '@quenk/wml';
import { GroupAttrs, Group } from '../../content/Group';

export interface MainAttrs extends GroupAttrs {

    ww?: { class?: string, content: Renderable }

}

/**
 * Main provides a container for the main content of an application.
 */
export class Main extends Group<MainAttrs> {

    view = new views.Main(this);

    values = {

        class: {

            root: concat(
                names.MAIN_VIEW,
                names.PUSHABLE,
                this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
