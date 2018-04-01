import * as afpl from 'afpl';
import * as names from './classNames';
import * as view from './wml/tab';
import { concat } from '../../common/util';
import { states } from '../../util/classNames';
import { TabClickedEvent } from './TabClickedEvent';
import { TabClickedEventHandler } from './TabClickedEventHandler';
import { Component, Attrs, View } from '@quenk/wml';
import { Control, ControlAttrsProperties } from '..';

/**
 * TabAttrsProperties
 */
export interface TabAttrsProperties extends ControlAttrsProperties {

    /**
     * active indicates whether the tab should be active or not.
     */
    active?: boolean,

    /**
     * text can be specified to be displayed on the tab.
     */
    text?: string

    /**
     * onClick is applied when the tab is clicked.
     */
    onClick?: (e: TabClickedEvent) => void;

}

/**
 * TabAttrs
 */
export interface TabAttrs extends Attrs {

    ww: TabAttrsProperties;

}

/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
export class Tab extends Component<TabAttrs> implements Control<TabAttrs> {

    view: View = new view.Main(this);

    values = {

        root: {

            id: 'root',

            class: concat(names.TAB_BAR_TAB, this.attrs.ww.active ? states.ACTIVE : ''),

        },
        a: {

            id: 'link',

            text: this.attrs.ww.text,

            clicked: (e: Event): void => {

                e.preventDefault();

                this
                    .view
                    .findById(this.values.root.id)
                    .chain((root: HTMLElement) => {

                        let parent = <HTMLElement>root.parentNode;
                        let us = parent.children;

                        for (var i = 0; i < us.length; i++)
                            us[i].classList.remove(states.ACTIVE);

                        return this
                            .view
                            .findById(this.values.root.id)
                            .map((el: HTMLElement) => el.classList.add(states.ACTIVE))
                            .chain(() => afpl.Maybe.fromAny(this.attrs.ww.onClick))
                            .map((f: TabClickedEventHandler) =>
                                f(new TabClickedEvent(this.attrs.ww.name)));
                    });

            }

        }

    };

    /**
     * click this Tab
     */
    click(): Tab {

        return this
            .view
            .findById(this.values.a.id)
            .map((e: HTMLElement) => e.click())
            .map(() => this)
            .get();

    }

}
