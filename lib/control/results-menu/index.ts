import { Maybe, nothing, just } from '@quenk/noni/lib/data/maybe';
import { Fun, View, Component, Content } from '@quenk/wml';
import { Menu, MenuAttrs } from '../../menu/menu';
import { WidgetAttrs } from '../../';
import { getById } from '../../util';
import { Event as ControlEvent } from '../';
import { Main, itemTemplate, noItemsTemplate } from './wml/results-menu';

/**
 * ItemTemplate used to render each item in the results.
 */
export type ItemTemplate<V>
    = (option: V) => (index: number) => Fun
    ;

/**
 * NoItemsTemplate is used when there are no results.
 */
export type NoItemsTemplate = Fun;

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
    name?: string,

    /**
    * itemTemplate if specified will be used to render each
    * result item.
    */
    itemTemplate?: ItemTemplate<V>,

    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate,

    /**
     * stringifier turns item values into a string so that 
     * they can be used used as labels.
     */
    stringifier?: Stringifier<V>,

    /**
     * onSelect is applied when the user selects an item.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void

}

/**
 * ItemSelectedEvent
 */
export class ItemSelectedEvent<V> extends ControlEvent<V> { }

/**
 * ResultsMenu used to display results in select styled controls.
 */
export class ResultsMenu<V>
    extends
    Component<WidgetAttrs<ResultsMenuAttrs<V>>> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'menu'

        },

        tree: <Maybe<Content>>nothing(),

        results: <V[]>[],

        name: (this.attrs.ww && this.attrs.ww.name) ?
            this.attrs.ww.name : '',

        block: (this.attrs.ww && this.attrs.ww.block) ?
            this.attrs.ww.block : false,

        hidden: true,

        item: {

            stringifier: (this.attrs.ww && this.attrs.ww.stringifier) ?
                this.attrs.ww.stringifier : (v: V) => Object.toString.call(v),

            click: (index: number) => {

                if (this.attrs.ww && this.attrs.ww.onSelect)
                    this.attrs.ww.onSelect(new ItemSelectedEvent(
                        this.attrs.ww && this.attrs.ww.name || '',
                        this.values.results[index]));

            },

            template: (): ItemTemplate<V> =>
                (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                    this.attrs.ww.itemTemplate : itemTemplate(this),

            noItemsTemplate: () =>
                (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                    this.attrs.ww.noItemsTemplate : noItemsTemplate(),

        }

    };

    open(): ResultsMenu<V> {

        getById<Menu>(this.view, this.values.wml.id)
            .map((m: Menu) => m.show());

        this.values.hidden = false;

        return this;

    }

    close(): ResultsMenu<V> {

        getById<Menu>(this.view, this.values.wml.id)
            .map((m: Menu) => m.hide());

        this.values.hidden = true;

        return this;

    }

    handleEvent(e: Event): void {

        if (this.values.tree.isJust()) {

            let root = this.values.tree.get();

            if (!document.body.contains(root))
                document.removeEventListener('click', this);

            if ((!root.contains(<Node>e.target)))
                this.close();

        }

    }

    /**
     * update will cause the menu to be displayed.
     */
    update(results: V[]): ResultsMenu<V> {

        this.values.results = results;

        window.removeEventListener('click', this);

        window.addEventListener('click', this);

        this.values.hidden = false;

        this.view.invalidate();

        return this;

    }

    render(): Content {

        this.values.tree = just(this.view.render());

        return this.values.tree.get();

    }

}
