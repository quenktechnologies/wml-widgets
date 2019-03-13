import * as views from './wml/droplist';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { Size, getSizeClassName } from '../../content/size';
import { BLOCK } from '../../content/orientation';
import { getId, getClassName } from '../../';
import { AbstractFeedbackControl } from '../feedback';
import { ControlAttrs, Event, getName } from '../';

///classNames:begin
export const DROPLIST = 'ww-droplist';
///classNames:end

/**
 * Option provides needed information for the Select to generate its
 * dropdown lost.
 */
export interface Option<V> {

    /**
     * title of the option.
     */
    title: string,

    /**
     * value used when the option is selected.
     */
    value: V

}

/**
 * DropListAttrs 
 */
export interface DropListAttrs<V> extends ControlAttrs<V> {

    /**
     * block display
     */
    block?: boolean,

    /**
     * size 
     */
    size?: Size,

    /**
     * options available for the Select.
     */
    options: Option<V>[];

    /**
     * onChange handler.
     */
    onChange?: (e: SelectionChangedEvent<V>) => void;

}

/**
 * SelectionChangedEvent indicates the user's selection 
 * has changed.
 */
export class SelectionChangedEvent<V> extends Event<V> { }

/**
 * Droplist provides a native <select> element with it's
 * event(s) converted to control events.
 */
export class Droplist<V> extends AbstractFeedbackControl<V, DropListAttrs<V>> {

    view: View = new views.Main(this);

    values = {

        control: {

            wml: {

                id: 'select'

            }

        },
        messages: {

            wml: {

                id: 'messages'

            }

        },

        id: getId(this.attrs),

        className: concat(DROPLIST,

            getClassName(this.attrs),

            (this.attrs.ww && this.attrs.ww.size) ?
                getSizeClassName(this.attrs.ww.size) : '',

            (this.attrs.ww && this.attrs.ww.block) ?
                BLOCK : ''),

        name: getName(this.attrs),

        options: (this.attrs.ww && this.attrs.ww.options) ?
            this.attrs.ww.options : [],

        onchange: (e: KeyboardEvent) => { dispatchChange(this, e) },

        selected: -1,

        instruction: 'Select one.'

    }

}

const dispatchChange = <V>(self: Droplist<V>, e: KeyboardEvent): void => {

    let value = Number((<HTMLInputElement>e.target).value);

    if (self.attrs.ww && self.attrs.ww.onChange)
        self.attrs.ww.onChange(new SelectionChangedEvent(
            (self.attrs.ww && self.attrs.ww.name) ? self.attrs.ww.name : '',
            self.values.options[value].value));

    self.values.selected = value;

}
