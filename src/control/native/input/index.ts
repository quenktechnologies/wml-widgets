import * as views from './wml/input';
import { View } from '@quenk/wml';
import { concat } from '../../../util';
import { ControlAttrs, Event, AbstractControl,getName } from '../../';
import {getId, getClassName} from '../../../';

///classNames:begin
export const NATIVE_INPUT = 'ww-native-input';
///classNames:end

/**
 * InputAttrs
 */
export interface InputAttrs extends ControlAttrs<string> {

    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string,

    /**
     * type of the text field.
     */
    type?: string,

    /**
     * readOnly indicates the Input is read only.
     */
    readOnly?: boolean,

    /**
     * onChange handler
     */
    onChange?: (e: TextChangedEvent) => void

}

/**
 * TextChangedEvent 
 */
export class TextChangedEvent extends Event<string> { }

/**
 * Values available to the Input's views.
 */
export class Values {

    constructor(
        public self: Input,
      public wml = { id: 'root' },
      public id = getId(self.attrs),
        public className = concat(NATIVE_INPUT, getClassName(self.attrs)),
      public name = getName(self.attrs),
        public type = (self.attrs.ww && self.attrs.ww.type) ? self.attrs.ww.type : 'text',

        public placeholder = (self.attrs.ww && self.attrs.ww.placeholder) ?
            self.attrs.ww.placeholder : '',

        public value = (self.attrs.ww && self.attrs.ww.value) ?
            self.attrs.ww.value : '',

        public disabled = (self.attrs.ww && self.attrs.ww.disabled === true) ?
            true : null,

        public readOnly = (self.attrs.ww && self.attrs.ww.readOnly === true) ?
            true : null,

        public oninput = dispatchInput(self)) { }

}

/**
 * Input provides a wrapped native text input control.
 */
export class Input extends AbstractControl<string, InputAttrs> {

    view: View = new views.Main(this);

    values: Values = new Values(this);

}

/**
 * dispatchInput when the user inputs some text.
 */
export const dispatchInput = (i: Input) => (e: KeyboardEvent) => {

    if (i.attrs.ww && i.attrs.ww.onChange)
    i.attrs.ww.onChange(new TextChangedEvent((i.attrs &&i.attrs.ww.name)?
      i.attrs.ww.name : '',
            (<HTMLInputElement>e.target).value));

}
