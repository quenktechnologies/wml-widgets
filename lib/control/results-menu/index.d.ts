import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Fun, View, Component, Content } from '@quenk/wml';
import { MenuAttrs } from '../../menu/menu';
import { WidgetAttrs } from '../../';
import { Event as ControlEvent } from '../';
export declare const RESULTS_MENU = "ww-results-menu";
/**
 * ItemTemplate used to render each item in the results.
 */
export declare type ItemTemplate<V> = (option: V, index: number) => Fun;
/**
 * NoItemsTemplate is used when there are no results.
 */
export declare type NoItemsTemplate = Fun;
/**
 * Stringifier turns a value into a string.
 */
export declare type Stringifier<V> = (v: V) => string;
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
export declare class ItemSelectedEvent<V> extends ControlEvent<V> {
}
/**
 * ResultsMenu used to display results in select styled controls.
 */
export declare class ResultsMenu<V> extends Component<WidgetAttrs<ResultsMenuAttrs<V>>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        tree: Maybe<Content>;
        results: V[];
        name: string;
        className: string;
        block: boolean;
        hidden: boolean;
        item: {
            stringifier: Stringifier<V>;
            click: (index: number) => void;
            template: ItemTemplate<V>;
            noItemsTemplate: () => Fun;
        };
    };
    open(): ResultsMenu<V>;
    close(): ResultsMenu<V>;
    toggle(): ResultsMenu<V>;
    handleEvent(e: Event): void;
    /**
     * update will cause the menu to be displayed.
     */
    update(results: V[]): ResultsMenu<V>;
    render(): Content;
}
