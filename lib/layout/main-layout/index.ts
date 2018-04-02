import * as views from './wml/main-layout';
import * as names from './classNames';
import * as orientation from '../../../lib/content/orientation/classNames';
import { View, Renderable } from '@quenk/wml';
import { concat } from '../../util';
import { GroupAttrs, Group } from '../../content/Group';

export interface MainAttrs extends GroupAttrs {

    ww?: { class?: string, content: Renderable }

}

/**
 * MainLayout provides a container for the main content of an application.
 */
export class MainLayout extends Group<MainAttrs> {

    view: View = new views.Main(this);

    values = {

        root: {

            class: concat(
                names.MAIN_LAYOUT,
                orientation.RIGHT_PUSHABLE,
                this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
