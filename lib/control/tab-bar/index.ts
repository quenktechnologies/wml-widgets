import * as views from './wml/tab-bar';
import {text} from '@quenk/wml/lib/dom';
import { View, Component } from '@quenk/wml';
import { ACTIVE } from '../../content/state/active';
import {JUSTIFIED} from '../../content/orientation';
import { concat, getById } from '../../util';
import {
    WidgetAttrs,
    HTMLElementAttrs,
    getId,
    getClassName
} from '../../';
import { ControlAttrs, AbstractControl, Event as ControlEvent } from '../';

///classNames:begin
/**
 * TAB
 */
export const TAB = 'ww-tab';

/**
 * TAB_BAR 
 */
export const TAB_BAR = 'ww-tab-bar';
///classNames:end

/**
 * TabClickedEventHandler
 */
export type TabClickedEventHandler = (e: TabClickedEvent) => void;

/**
 * TabAttrs
 */
export interface TabAttrs extends ControlAttrs<void> {

    /**
     * active indicates whether the tab should be active or not.
     */
    active?: boolean,

    /**
     * text can be specified to be displayed on the tab.
     */
    text?: string,

    /**
     * onClick is applied when the tab is clicked.
     */
    onClick?: TabClickedEventHandler

}

/**
 * TabBarAttrs
 */
export interface TabBarAttrs extends HTMLElementAttrs {

  /**
   * justify the tab alignment.
   */
  justify?: boolean

}

/**
 * TabClickedEvent is fired when a user clicks on a tab.
 *
 * It contains information about the tab that was clicked.
 */
export class TabClickedEvent extends ControlEvent<string> {

    constructor(public name: string) { super(name, name); }

}

/**
 * Tab provides a single tab item.
 *
 * When a tab is clicked, it attempts to remove the active class from
 * it's siblings and apply it to itself. Therefore the sibling of a
 * tab should always be a Tab.
 */
export class Tab extends AbstractControl<void, TabAttrs> {

    view: View = new views.Tab(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(TAB, getClassName(this.attrs),
                (this.attrs.ww && this.attrs.ww.active) ? ACTIVE : ''),

        },
        a: {

            wml: {

                id: 'link'

            },

            content: (this.attrs.ww && this.attrs.ww.text) ?
                [text(this.attrs.ww.text)] : this.children,

            clicked: (e: Event): void => {

                e.preventDefault();

                let maybeRoot = getById<HTMLElement>(this.view,
                    this.values.root.wml.id);

                if (maybeRoot.isNothing()) return;

                let root: HTMLElement = maybeRoot.get();
                let parent = <HTMLElement>root.parentNode;
                let sibs = parent.children;

                for (var i = 0; i < sibs.length; i++)
                    sibs[i].classList.remove(ACTIVE);

                root.classList.add(ACTIVE);

                if (this.attrs.ww && this.attrs.ww.onClick)
                this.attrs.ww.onClick(
                  new TabClickedEvent(`${this.attrs.ww.name}`));

            }

        }

    };

    /**
     * click this Tab
     */
    click(): Tab {

        getById<HTMLElement>(this.view, this.values.root.wml.id)
            .map(e => e.click());

        return this;

    }

}

/**
 * TabBar acts as a parent container for a group of Tab.
 *
 * Use it to create a tabbed navigation or view for main layout,
 * sub views or forms etc.
 */
export class TabBar extends Component<WidgetAttrs<TabBarAttrs>> {

    view: View = new views.TabBar(this);

    values = {

        root: {

            id: getId(this.attrs),

          className: concat(TAB_BAR,
                            getClassName(this.attrs),
                            (this.attrs.ww && this.attrs.ww.justify)?  JUSTIFIED:'')

        }

    }

}
