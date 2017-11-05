import * as names from '@package/self/common/names';
import * as view from './wml/tabs';
import * as afpl from 'afpl';
import { concat } from '@package/self/common/util';
import { TabClickedEvent } from './TabClickedEvent';
import { TabClickedEventHandler } from './TabClickedEventHandler';
import { Component, Attrs, View } from '@quenk/wml';

const _unknown = (id: string) =>
    console.warn(`Missing element with id ${id}.`);

/**
 * TabAttrs
 */
export interface TabAttrs extends Attrs {

    ww: {
        name: string,
        class?: string,
        active?: boolean,
        text?: string
        onClick?: (e: TabClickedEvent) => void;
    }

}

/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
export class Tab extends Component<TabAttrs> {

    view: View = new view.Tab(this);

    values = {

        id: {

            root: 'root',
            a: 'link'

        },
        class: {
            li: concat(names.TABS_TAB, this.attrs.ww.active ? names.ACTIVE : '')
        },
        tab: {

            text: this.attrs.ww.text

        }

    };

    clicked = (e: Event): void => {

        e.preventDefault();

        this
            .view
            .findById(this.values.id.root)
            .chain((root: HTMLElement) => {

                let parent = <HTMLElement>root.parentNode;
                let us = parent.children;

                for (var i = 0; i < us.length; i++)
                    us[i].classList.remove(names.ACTIVE);

                return this
                    .view
                    .findById(this.values.id.root)
                    .map((el: HTMLElement) => el.classList.add(names.ACTIVE))
                    .orJust(() => _unknown(this.values.id.root))
                    .chain(() => afpl.Maybe.fromAny(this.attrs.ww.onClick))
                    .map((f: TabClickedEventHandler) =>
                        f(new TabClickedEvent(this.attrs.ww.name)));
            });

    }

    /**
     * click this Tab
     */
    click(): void {

        this
            .view
            .findById(this.values.id.a)
            .cata(
            () => _unknown(this.values.id.a),
            (e: HTMLElement) => e.click());

    }


}
