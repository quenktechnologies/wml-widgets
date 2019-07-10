import * as views from './wml/select';
import { Maybe, just, nothing } from '@quenk/noni/lib/data/maybe';
import { BLOCK } from '../../content/orientation';
import { concat, getById } from '../../util';
import {
    Message,
    getValidityClassName,
    getMessage,
} from '../feedback';
import { FormControlAttrs, AbstractFormControl, getLabel } from '../form';
import { TermChangedEvent } from '../search';
import { WidgetAttrs, getId, getClassName } from '../../';
import { Event as ControlEvent, getName } from '../';
import {
    Stringifier,
    ItemTemplate,
    NoItemsTemplate,
    ResultsMenu,
    ItemSelectedEvent
} from '../results-menu';
import { Help } from '../help';

export { Stringifier, ItemTemplate, ResultsMenu, TermChangedEvent }

///classNames:begin
export const SELECT = 'ww-select';
///classNames:end

/**
 * CommonSelectAttrs
 */
export interface CommonSelectAttrs<V>
    extends
    FormControlAttrs<V> {

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
      * inputClassName is the class list for the input.
      */
    inputClassName?: string,

    /**
     * placeholder text for the input.
     */
    placeholder?: string,

    /**
     * readOnly
     */
    readOnly?: boolean,

    /**
     * block 
     */
    block?: boolean,

    /**
     * options to initialize the dropdown list with.
     * These options are displayed by default when
     * the input gains focused.
     */
    options?: V[],

    /**
     * stringifier turns the value to a string.
     */
    stringifier?: Stringifier<V>,

    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;

}

/**
 * SelectAttrs
 */
export interface SelectAttrs<V> extends CommonSelectAttrs<V> {

    /**
     * onChange handler.
     */
    onChange?: (e: ItemChangedEvent<V>) => void;

    /**
     * onUnset handler.
     */
    onUnset?: (e: ItemUnsetEvent) => void

}

/**
 * ItemChangedEvent
 */
export class ItemChangedEvent<V> extends ControlEvent<V> { }

/**
 * ItemUnsetEvent
 */
export class ItemUnsetEvent extends ControlEvent<undefined> {

    constructor(public name: string) {

        super(name, undefined);

    }

}

/**
 * RootSection
 */
export class RootSection<V> {

    constructor(public attrs: WidgetAttrs<CommonSelectAttrs<V>>) { }

    public wml = { id: 'root' };

    public id = getId(this.attrs);

    public className = concat(SELECT,
        getClassName(this.attrs),
        getValidityClassName(this.attrs),
        (this.attrs.ww && this.attrs.ww.block) ? BLOCK : '');

}

/**
 * ControlSection
 */
export class ControlSection {

    constructor() { }

    public wml = { id: 'root' };

}

/**
 * MessagesSection
 */
export class MessagesSection<V> {

    constructor(public attrs: WidgetAttrs<CommonSelectAttrs<V>>) { }

    public wml = { id: 'message' };

    public text = getMessage(this.attrs)

}

/**
 * LabelSection
 */
export class LabelSection<V> {

    constructor(public attrs: WidgetAttrs<CommonSelectAttrs<V>>) { }

    public id = getName(this.attrs);

    public text = getLabel(this.attrs);

}

/**
 * InputSection
 */
export class InputSection<V> {

    constructor(public attrs: WidgetAttrs<CommonSelectAttrs<V>>) { }

    public wml = { id: 'input' };

}

/**
 * SearchSection
 */
export class SearchSection<V> {

    constructor(
        public attrs: WidgetAttrs<CommonSelectAttrs<V>>,
        public close: () => void) { }

    public wml = { id: 'search' };

    public name = getName(this.attrs);

    public className = (this.attrs.ww && this.attrs.ww.inputClassName) ?
        this.attrs.ww.inputClassName : '';

    public placeholder = (this.attrs.ww && this.attrs.ww.placeholder) ?
        this.attrs.ww.placeholder : '';

    public block = (this.attrs.ww && this.attrs.ww.block) ?
        this.attrs.ww.block : false;

    public value = (this.attrs.ww && this.attrs.ww.value) ?
        this.attrs.ww.value : undefined;

    public readOnly = (this.attrs.ww && this.attrs.ww.readOnly);

    public onSearch = (this.attrs.ww && this.attrs.ww.onSearch) ?
        this.attrs.ww.onSearch : () => { };

    public onEscape = () => this.close();

}

/**
 * MenuSection
 */
export class MenuSection<V> {

    constructor(
        public attrs: WidgetAttrs<CommonSelectAttrs<V>>,
        public onSelect: (e: ItemSelectedEvent<V>) => void) { }

    public wml = { id: 'menu' };

    public block = (this.attrs.ww && this.attrs.ww.block) ?
        this.attrs.ww.block : false;

    public options = <V[]>(this.attrs.ww && this.attrs.ww.options) || [];

    public itemTemplate = (this.attrs.ww && this.attrs.ww.itemTemplate) ?
        this.attrs.ww.itemTemplate : undefined;

    public noItemsTemplate = (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
        this.attrs.ww.noItemsTemplate : undefined;

    public stringifier = (this.attrs.ww && this.attrs.ww.stringifier) ?
        this.attrs.ww.stringifier : undefined;

}

/**
 * Select provides an control for selecting an item from a
 * list.
 */
export class Select<V>
    extends
    AbstractFormControl<V, SelectAttrs<V>> {

    view: views.Main<V> = new views.Main(this);

    values = {

        root: new RootSection(this.attrs),

        control: new ControlSection(),

        messages: new MessagesSection(this.attrs),

        label: new LabelSection(this.attrs),

        input: new InputSection(this.attrs),

        search: new SearchSection(this.attrs, () => this.close()),

        tag: {

            className: getValidityClassName(this.attrs),

            value: <Maybe<V>>((this.attrs.ww && (this.attrs.ww.value != undefined)) ?
                just(this.attrs.ww.value) : nothing()),

            isSet: () => this.values.tag.value.isJust(),

            getText: () => {

                if (this.attrs.ww && this.attrs.ww.stringifier)
                    return this.attrs.ww.stringifier(this.values.tag.value.get());

                return '';

            },

            dismiss: () => {

                this.values.tag.value = nothing();

                if (this.attrs.ww && this.attrs.ww.onUnset)
                    this.attrs.ww.onUnset(
                        new ItemUnsetEvent(this.attrs.ww.name + ''));

                this.view.invalidate();

            }

        },

        menu: new MenuSection(this.attrs, (e: ItemSelectedEvent<V>) => {

            this.close();

            this.values.tag.value = just(e.value);

            if (this.attrs.ww && this.attrs.ww.onChange)
                this.attrs.ww.onChange(new ItemChangedEvent(
                    '' + this.attrs.ww.name, e.value));

            this.view.invalidate();

        })

    };

    open(): Select<V> {

        getById<ResultsMenu<V>>(this.view, this.values.menu.wml.id)
            .map((m: ResultsMenu<V>) => m.open());

        return this;

    }

    close(): Select<V> {

        getById<ResultsMenu<V>>(this.view, this.values.menu.wml.id)
            .map((m: ResultsMenu<V>) => m.close());

        return this;

    }

    setMessage(msg: Message): Select<V> {

        this.values.messages.text = msg;
        getHelp(this).map(h => h.setMessage(msg));
        return this;

    }

    removeMessage(): Select<V> {

        this.values.messages.text = '';
        getHelp(this).map(h => h.removeMessage());
        return this;

    }

    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results: V[]): Select<V> {

        let mMenu = getById<ResultsMenu<V>>(this.view, this.values.menu.wml.id);

        if (mMenu.isJust())
            mMenu.get().update(results);

        return this;

    }

}

const getHelp = <V>(t: Select<V>): Maybe<Help> =>
    getById(t.view, t.values.messages.wml.id);
