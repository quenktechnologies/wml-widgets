import { Maybe, nothing, just } from '@quenk/noni/lib/data/maybe';

import { View, Component, Content } from '@quenk/wml';

import { Menu, MenuAttrs } from '../../menu/menu';
import { getClassName } from '../../';
import { getById, concat } from '../../util';
import { Event as ControlEvent } from '../';
import {
    Main,
    ItemTemplateView,
    NoItemsTemplateView
} from './wml/results-menu';

///classNames:begin
export const RESULTS_MENU = 'ww-results-menu';
///classNames:end

/**
 * ItemTemplate used to render each item in the results.
 */
export type ItemTemplate<V> = (
    option: V,
    index: number,
    menu: ResultsMenu<V>
) => View;

/**
 * NoItemsTemplate is used when there are no results.
 */
export type NoItemsTemplate = View;

/**
 * Stringifier turns a value into a string.
 */
export type Stringifier<V> = (v: V) => string;

/**
 * ResultsMenuAttrs
 */
export interface ResultsMenuAttrs<V> extends MenuAttrs {
    /**
     * name of the control.
     *
     * Used by controls to tag events with names.
     */
    name?: string;

    /**
     * hidden determines whether the menu is shown or not, defaults to false.
     */
    hidden?: boolean;

    /**
     * results pre-populates teh menu.
     */
    results?: V[];

    /**
     * itemTemplate if specified will be used to render each
     * result item.
     */
    itemTemplate?: ItemTemplate<V>;

    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate;

    /**
     * stringifier turns item values into a string so that
     * they can be used used as labels.
     */
    stringifier?: Stringifier<V>;

    /**
     * onSelect is applied when the user selects an item.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void;

    /**
     * onOpen is applied when the menu is opened.
     */
    onOpen?: () => void;

    /**
     * onClose is applied when the menu is closed.
     */
    onClose?: () => void;
}

/**
 * ItemSelectedEvent
 */
export class ItemSelectedEvent<V> extends ControlEvent<V> {}

/**
 * ResultsMenu is used to display menu items in dropdown style control widgets.
 */
export class ResultsMenu<V> extends Component<ResultsMenuAttrs<V>> {
    view: View = new Main(this);

    values = {
        wml: {
            id: 'menu'
        },

        tree: <Maybe<Node>>nothing(),

        results:
            this.attrs && this.attrs.results ? this.attrs.results : <V[]>[],

        name: this.attrs && this.attrs.name ? this.attrs.name : '',

        className: concat(RESULTS_MENU, getClassName(this.attrs)),

        hidden: this.attrs && this.attrs.hidden ? this.attrs.hidden : false,

        showing: false,

        item: {
            stringifier:
                this.attrs && this.attrs.stringifier
                    ? this.attrs.stringifier
                    : (v: V) => Object.toString.call(v),

            click: (index: number) => {
                if (this.attrs && this.attrs.onSelect)
                    this.attrs.onSelect(
                        new ItemSelectedEvent(
                            (this.attrs && this.attrs.name) || '',
                            this.values.results[index]
                        )
                    );
            },

            template: (result: V, index: number): View =>
                this.attrs && this.attrs.itemTemplate
                    ? this.attrs.itemTemplate(result, index, this)
                    : new ItemTemplateView({
                          option: this.values.item.stringifier(result)
                      }),

            noItemsTemplate: (): View =>
                this.attrs && this.attrs.noItemsTemplate
                    ? this.attrs.noItemsTemplate
                    : new NoItemsTemplateView({})
        }
    };

    open(): ResultsMenu<V> {
        getById<Menu>(this.view, this.values.wml.id).map((m: Menu) => m.show());

        if (this.attrs && this.attrs.onOpen) this.attrs.onOpen();

        return this;
    }

    close(): ResultsMenu<V> {
        getById<Menu>(this.view, this.values.wml.id).map((m: Menu) => m.hide());

        if (this.attrs && this.attrs.onClose) this.attrs.onClose();

        return this;
    }

    toggle(): ResultsMenu<V> {
        getById<Menu>(this.view, this.values.wml.id).map((m: Menu) => {
            m.toggle();

            if (m.isHidden()) {
                if (this.attrs.onOpen) this.attrs.onOpen();
            } else {
                if (this.attrs.onClose) this.attrs.onClose();
            }
        });

        return this;
    }

    /**
     * update will cause the menu to be displayed.
     */
    update(results: V[]): ResultsMenu<V> {
        this.values.results = results;

        this.values.hidden = false;

        this.view.invalidate();

        return this;
    }

    render(): Content {
        this.values.tree = just(<Node>this.view.render());

        return this.values.tree.get();
    }
}
