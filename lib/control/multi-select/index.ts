import * as views from './wml/multi-select';
import { View, Maybe } from '@quenk/wml';
import { getBlockClassName } from '../../content/orientation';
import { FormControlAttrs, AbstractFormControl, getLabel, setMessage, removeMessage } from '../form';
import {
    Stringifier,
    TermChangedEvent,
    ItemSelectedEvent,
    NoItemsTemplate,
    ItemTemplate,
    Input,
    updateMenu,
    openMenu,
    closeMenu
} from '../search';
import { concat, getById } from '../../util';
import { getId, getClassName } from '../../';
import { Event as ControlEvent, getName } from '../';
import { getMessage, getValidityClassName, Message } from '../feedback';
import { DismissEvent } from '../tag';
import { ACTIVE } from '../../content/state/active';

export { NoItemsTemplate, ItemTemplate, TermChangedEvent }

///classNames:begin
export const MULTI_SELECT = 'ww-multi-select';
export const MULTI_SELECT_CONTENT = 'ww-multi-select__content';
export const MULTI_SELECT_INPUT = 'ww-multi-select__input';
export const MULTI_SELECT_TAG = 'ww-multi-select__tag';
///classNames:end

export const DEFAULT_INPUT_WIDTH = 50;
export const DEFAULT_FONT_INCREMENT = 7;

/**
 * MutliselectAttrs
 */
export interface MutliselectAttrs<V> extends FormControlAttrs<V[]> {

    /**
     * block flag
     */
    block?: boolean,

    /**
     * inputWidth indicates how wide the invisible input should be initially.
     */
    inputWidth?: number,

    /**
     * fontIncrement is used when expanding the input as the user types.
     */
    fontIncrement?: number,

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
     * onSearch receives events from the SearchControl.
     */
    onSearch?: (s: TermChangedEvent) => void

    /**
     * onChange handler.
     */
    onChange?: (e: ItemsChangedEvent<V>) => void,

    /**
     * stringifier 
     */
    stringifier?: Stringifier<V>

}

/**
 * ItemsChangedEvent
 */
export class ItemsChangedEvent<V> extends ControlEvent<V[]> { }

/**
 * MultiSelect 
 */
export class MultiSelect<V>
    extends AbstractFormControl<V[], MutliselectAttrs<V>> {

    view: View = new views.Main(this);

    values = {


        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(MULTI_SELECT,
                getClassName(this.attrs),
                getValidityClassName(this.attrs),
                getBlockClassName(this.attrs))

        },
        control: {

            wml: {

                id: 'root'

            }

        },
        label: {

            wml: {

                id: 'label'

            },
            text: getLabel(this.attrs)

        },
        search: {

            wml: {
                id: 'search'
            },

            block: this.attrs.ww && this.attrs.ww.block || undefined,

            itemTemplate: (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                this.attrs.ww.itemTemplate : undefined,

            noItemsTemplate: (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                this.attrs.ww.noItemsTemplate : undefined,

            onSearch: (evt: TermChangedEvent) => {

                if (this.attrs.ww && this.attrs.ww.onSearch)
                    this.attrs.ww.onSearch(evt);

            },
            onSelect: ({ value }: ItemSelectedEvent<V>) => {

                this.push(value);
                this.fireChange();
                this.redraw();

            }

        },
        messages: {

            wml: {

                id: 'message'

            },
            text: getMessage(this.attrs)

        },
        content: {

            className: MULTI_SELECT_CONTENT,

            onfocus: () => this.focus()

        },
        tags: {

            className: concat(MULTI_SELECT_TAG,
                getValidityClassName(this.attrs)),

            value: <V[]>[],

            has: () => this.values.tags.value.length > 0,

            getText: (this.attrs.ww && this.attrs.ww.stringifier) ?
                this.attrs.ww.stringifier : (v: V) => String(v),

            onDismiss: (e: DismissEvent) => {

                let idx = Number(e.name);

                this.values.tags.value.splice(idx, 1);

                this.fireChange();

                this.redraw();

            }

        },
        input: {

            wml: {

                id: 'input'

            },

            className: MULTI_SELECT_INPUT,

            name: getName(this.attrs),

            inputWidth: (this.attrs.ww && this.attrs.ww.inputWidth) ?
                this.attrs.ww.inputWidth : DEFAULT_INPUT_WIDTH,

            fontIncrement: (this.attrs.ww && this.attrs.ww.fontIncrement) ?
                this.attrs.ww.fontIncrement : DEFAULT_FONT_INCREMENT,

            onSearch: (e: TermChangedEvent) => {

                this.grow(e.value.length + 1);

                if (this.attrs.ww && this.attrs.ww.onSearch)
                    this.attrs.ww.onSearch(e);

            }

        },
        menu: {

            wml: { id: 'menu' },

            name: getName(this.attrs),

            block: true,

            onSelect: (e: ItemSelectedEvent<V>) => {

                this.close();

                this.values.tags.value.push(e.value);

                this.fireChange();

                this.redraw();

            },
            itemTemplate: (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                this.attrs.ww.itemTemplate : undefined,

            noItemsTemplate: (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                this.attrs.ww.noItemsTemplate : undefined,

            stringifier: (this.attrs.ww && this.attrs.ww.stringifier) ?
                this.attrs.ww.stringifier : undefined

        }

    };

    /**
     * @private
     */
    fireChange(): void {

        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new ItemsChangedEvent(
                getName(this.attrs), this.values.tags.value.slice()));

    }

    /**
     * @private
     */
    grow(n: number): void {

        let mInput = getById<Input>(this.view, this.values.input.wml.id);

        if (mInput.isNothing()) return;

        let i = mInput.get();

        let mDom = getById<HTMLInputElement>(i.view, i.values.wml.id);

        if (mDom.isNothing()) return;

        let dom = mDom.get();

        dom.style.width = `${n * this.values.input.fontIncrement}px`;

    }

    /**
     * @private
     */
    redraw(): MultiSelect<V> {

        this.view.invalidate();
        this.focus();
        return this;

    }

    setMessage(msg: Message): MultiSelect<V> {

        setMessage(this.view, this.values.messages.wml.id, msg);
        return this;

    }

    removeMessage(): MultiSelect<V> {

        removeMessage(this.view, this.values.messages.wml.id);
        return this;

    }

    update(results: V[]): MultiSelect<V> {

        updateMenu(this.view, this.values.menu.wml.id, results);
        return this;

    }

    open(): MultiSelect<V> {

        openMenu(this.view, this.values.menu.wml.id);
        return this;

    }

    close(): MultiSelect<V> {

        closeMenu(this.view, this.values.menu.wml.id);
        return this;

    }

    focus(): MultiSelect<V> {

        getInput(this).map(i => i.focus());

        getRoot(this).map(e => e.classList.add(ACTIVE));

        return this;

    }

    /**
     * push a value onto the end of the internal stack.
     */
    push(value: V): MultiSelect<V> {

        this.values.tags.value.push(value);
        this.fireChange();
        return this;

    }

}

const getInput = <V>(m: MultiSelect<V>): Maybe<Input> =>
    getById<Input>(m.view, m.values.input.wml.id);

const getRoot = <V>(m: MultiSelect<V>): Maybe<HTMLElement> =>
    getById<HTMLElement>(m.view, m.values.root.wml.id);
