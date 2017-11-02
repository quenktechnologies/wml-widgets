import * as views from './wml/main';
import * as names from '@package/self/common/names';
import { concat } from '@package/self/common/util';
import { Renderable } from '@quenk/wml-runtime';
import { GroupAttrs, Group } from '@package/self/content/Group';

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