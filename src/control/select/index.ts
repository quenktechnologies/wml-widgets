import * as views from './wml/select';

import { View } from '@quenk/wml';
import { Maybe, just, nothing } from '@quenk/noni/lib/data/maybe';

import { getBlockClassName } from '../../content/orientation';
import { concat, getById } from '../../util';
import { Message, getValidityClassName, getMessage } from '../feedback';
import {
    FormControlAttrs,
    AbstractFormControl,
    getLabel,
    removeMessage,
    setMessage
} from '../form';
import { getId, getClassName } from '../../';
import { Event as ControlEvent, getName } from '../';
import {
    TermChangedEvent,
    ItemSelectedEvent,
    Stringifier,
    NoItemsTemplate,
    ItemTemplate,
    Search
} from '../search';

export {
    Stringifier,
    ItemTemplate,
    NoItemsTemplate,
    TermChangedEvent,
    ItemSelectedEvent
};

///classNames:begin
export const SELECT = 'ww-select';
///classNames:end

/**
 * CommonSelectAttrs
 */
export interface CommonSelectAttrs<V> extends FormControlAttrs<V> {
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
     * inputClassName is the class list for the input.
     */
    inputClassName?: string;

    /**
     * placeholder text for the input.
     */
    placeholder?: string;

    /**
     * readOnly
     */
    readOnly?: boolean;

    /**
     * disabled
     */
    disabled?: boolean;

    /**
     * block
     */
    block?: boolean;

    /**
     * stringifier turns the value to a string.
     */
    stringifier?: Stringifier<V>;

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
    onUnset?: (e: ItemUnsetEvent) => void;
}

/**
 * ItemChangedEvent
 */
export class ItemChangedEvent<V> extends ControlEvent<V> {}

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
    constructor(
        public attrs: CommonSelectAttrs<V>,
        public id = getId(attrs),
        public className = concat(
            SELECT,
            getClassName(attrs),
            getValidityClassName(attrs),
            getBlockClassName(attrs)
        )
    ) {}

    public wml = { id: 'root' };
}

/**
 * ControlSection
 */
export class ControlSection {
    constructor() {}

    public wml = { id: 'root' };
}

/**
 * MessagesSection
 */
export class MessagesSection<V> {
    constructor(
        public attrs: FormControlAttrs<V>,
        public text = getMessage(attrs)
    ) {}

    public wml = { id: 'message' };
}

/**
 * LabelSection
 */
export class LabelSection<V> {
    constructor(
        public attrs: FormControlAttrs<V>,
        public id = getName(attrs),
        public text = getLabel(attrs)
    ) {}
}

/**
 * InputSection
 */
export class InputSection {
    constructor(public attrs: object) {}

    public wml = { id: 'input' };
}

/**
 * SearchSection
 */
export class SearchSection<V> {
    constructor(
        public attrs: CommonSelectAttrs<V>,
        public close: () => void,
        public onSelect: (e: ItemSelectedEvent<V>) => void,
        public name = getName(attrs),
        public className = attrs && attrs.inputClassName
            ? attrs.inputClassName
            : '',

        public placeholder = attrs && attrs.placeholder
            ? attrs.placeholder
            : '',
        public block = attrs && attrs.block ? attrs.block : false,
        public value = attrs && attrs.value ? attrs.value : undefined,
        public readOnly = attrs && attrs.readOnly,
        public disabled = attrs && attrs.disabled,
        public itemTemplate = attrs && attrs.itemTemplate
            ? attrs.itemTemplate
            : undefined,
        public noItemsTemplate = attrs && attrs.noItemsTemplate
            ? attrs.noItemsTemplate
            : undefined,
        public stringifier = attrs && attrs.stringifier
            ? attrs.stringifier
            : undefined,
        public onSearch = attrs && attrs.onSearch ? attrs.onSearch : () => {}
    ) {}

    public wml = { id: 'search' };
}

/**
 * Select provides an control for selecting an item from a
 * list.
 */
export class Select<V> extends AbstractFormControl<V, SelectAttrs<V>> {
    view: views.Main<V> = new views.Main(this);

    values = {
        root: new RootSection(this.attrs),

        control: new ControlSection(),

        messages: new MessagesSection(this.attrs),

        label: new LabelSection(this.attrs),

        input: new InputSection(this.attrs),

        search: new SearchSection(
            this.attrs,
            () => this.close(),
            (e: ItemSelectedEvent<V>) => {
                this.close();

                this.values.tag.value = just(e.value);

                if (this.attrs && this.attrs.onChange)
                    this.attrs.onChange(
                        new ItemChangedEvent('' + this.attrs.name, e.value)
                    );

                this.view.invalidate();
            }
        ),

        tag: {
            className: getValidityClassName(this.attrs),

            value: <Maybe<V>>(
                (this.attrs && this.attrs.value != undefined
                    ? just(this.attrs.value)
                    : nothing())
            ),

            disabled:
                this.attrs && this.attrs.disabled ? this.attrs.disabled : false,

            isSet: () => this.values.tag.value.isJust(),

            getText: () => {
                if (this.attrs && this.attrs.stringifier)
                    return this.attrs.stringifier(this.values.tag.value.get());

                return '';
            },

            dismiss: () => {
                this.values.tag.value = nothing();

                if (this.attrs && this.attrs.onUnset)
                    this.attrs.onUnset(
                        new ItemUnsetEvent(this.attrs.name + '')
                    );

                this.view.invalidate();
            }
        }
    };

    open(): Select<V> {
        open(this.view, this.values.search.wml.id);
        return this;
    }

    close(): Select<V> {
        close(this.view, this.values.search.wml.id);
        return this;
    }

    setMessage(msg: Message): Select<V> {
        this.values.messages.text = msg;
        setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    }

    removeMessage(): Select<V> {
        this.values.messages.text = '';
        removeMessage(this.view, this.values.messages.wml.id);
        return this;
    }

    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results: V[]): Select<V> {
        update(this.view, this.values.search.wml.id, results);
        return this;
    }
}

/**
 * open helper.
 *
 * Invokes the open method on the Search widget.
 */
export const open = <V>(view: View, id: string) => {
    getById<Search<V>>(view, id).map((m: Search<V>) => m.open());
};

/**
 * close helper.
 *
 * Invokes the close method on the Search widget.
 */
export const close = <V>(view: View, id: string) => {
    getById<Search<V>>(view, id).map((m: Search<V>) => m.close());
};

/**
 * update helper.
 *
 * Invokes the update method on the Search widget.
 */
export const update = <V>(view: View, id: string, results: V[]) => {
    let mSearch = getById<Search<V>>(view, id);

    if (mSearch.isJust()) mSearch.get().update(results);
};
