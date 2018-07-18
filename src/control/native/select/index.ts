import * as views from './wml/select';
import { View } from '@quenk/wml';
import { concat } from '../../../util';
import { ControlAttrs, Event, GenericControl } from '../../';

///classNames:begin
export const NATIVE_SELECT = 'ww-native-select';
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
 * SelectAttrs 
 */
export interface SelectAttrs<V> extends ControlAttrs<V> {

    /**
     * options available for the Select.
     */
    options: Option<V>[];

    /**
     * onChange handler.
     */
    onChange: (e: SelectionChangedEvent<V>) => void;

}

/**
 * SelectionChangedEvent indicates the user's selection 
 * has changed.
 */
export class SelectionChangedEvent<V> extends Event<V> { }

/**
 * Values available to the Select's view.
 */
export class Values<V> {

    constructor(
        public self: Select<V>,
        public options: Option<V>[],
        public onchange = dispatchChange(self),
        public selected = -1,
        public className = concat(NATIVE_SELECT, self.attrs.ww.class),
        public instruction = 'Select one.') { }

}

/**
 * Select provides a native <select> element with it's
 * event(s) converted to control events.
 */
export class Select<V> extends GenericControl<V, SelectAttrs<V>> {

    view: View = new views.Main(this);

    values: Values<V> = new Values(this, this.attrs.ww.options);

}

/**
 * dispatchChange when the selected item changes.
 */
export const dispatchChange = <V>(self: Select<V>) => (e: KeyboardEvent) => {

    let value = Number((<HTMLInputElement>e.target).value);

    if (self.attrs.ww && self.attrs.ww.onChange)
        self.attrs.ww.onChange(new SelectionChangedEvent(self.attrs.ww.name,
            self.values.options[value].value));

    self.values.selected = value;

}
