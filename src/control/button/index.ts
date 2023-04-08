import * as views from './wml/button';

import { text } from '@quenk/wml/lib/dom';
import { View } from '@quenk/wml';

import { TOOLBAR_COMPAT } from '../toolbar';
import { ACTIVE } from '../../content/state/active';
import { BLOCK } from '../../content/orientation';
import { DEFAULT, OUTLINE, Style, getStyleClassName } from '../../content/style';
import { Size, getSizeClassName } from '../../content/size';
import { concat, getById } from '../../util';
import { getClassName, getId } from '../../';
import { ControlAttrs, AbstractControl, Event as ControlEvent } from '../';

export { Style }

///classNames:begin
export const BUTTON = 'ww-button';
///classNames:end

/**
 * ButtonClickedEventHandler is a callback for button clicks.
 */
export type ButtonClickedEventHandler<V> =  (e: ButtonClickedEvent<V>) => void

/**
 * ButtonAttrs
 */
export interface ButtonAttrs<V> extends ControlAttrs<V> {

    /**
     * size modifier for the button.
     */
    size?: Size,

    /**
     * style assigns one of the supported styles.
     */
    style?: Style,

    /**
     * outline uses an alternative outline styling 
     */
    outline?: boolean,

    /**
     * active indicates whether the button is active or not.
     */
    active?: boolean,

    /**
     * block scope this button.
     */
    block?: boolean,

    /**
     * onClick assigns a handler for click events.
     */
    onClick?: ButtonClickedEventHandler<V>,

    /**
     * anchor if true will render an anchor instead of a button.
     */
    anchor?: boolean,

  /**
   * caret if true will render a caret indicating the button can reveal a menu.
   */
  caret?: boolean, 

    /**
     * text can be specified as an alternative to explicit children.
     */
    text?: string

    /**
     * type corresponds to the html attribute.
     */
    type?: string,

};

/**
 * ButtonClickedEvent
 */
export class ButtonClickedEvent<V> extends ControlEvent<V> { }

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button<V> extends AbstractControl<V, ButtonAttrs<V>> {

    view: View = (this.attrs && this.attrs.anchor) ?
        new views.AnchorView(this) : new views.ButtonView(this);

    values = {

        button: {

            wml: {

                id: 'button'

            },

            id: getId(this.attrs),

            className: concat(BUTTON,

                getClassName(this.attrs),

                TOOLBAR_COMPAT,

                (this.attrs && this.attrs.style) ?
                    getStyleClassName(this.attrs.style) :
                    DEFAULT,

                (this.attrs && this.attrs.size) ?
                    getSizeClassName(this.attrs.size) : '',

                (this.attrs && this.attrs.outline) ?
                    OUTLINE : '',

                (this.attrs && this.attrs.block) ?
                    BLOCK : '',

                (this.attrs && this.attrs.active) ?
                    ACTIVE : ''),

            type: (this.attrs && this.attrs.type) ?
                this.attrs.type : 'button',

            name: (this.attrs && this.attrs.name) ? this.attrs.name : '',

            disabled: (this.attrs && this.attrs.disabled) ? true : null,

            anchor: (this.attrs && this.attrs.anchor) ?
                this.attrs.anchor : false,

          caret: this.attrs.caret,

            onclick: (e: Event) => {

                e.preventDefault();

                this.attrs &&
                    this.attrs.onClick &&
                    this.attrs.onClick(new ButtonClickedEvent(
                        (this.attrs && this.attrs.name) ?
                            this.attrs.name : '', <V>this.attrs.value))

            },

            content: () => (this.attrs && this.attrs.text) ?
                [text(this.attrs.text)] : this.children

        }

    };

    /**
     * disable this button.
     */
    disable(): void {

        getById<HTMLButtonElement>(this.view, this.values.button.wml.id)
            .map((b: HTMLButtonElement) => b.setAttribute('disabled', 'disabled'));

    }

    /**
     * enable this button.
     */
    enable(): void {

        getById<HTMLButtonElement>(this.view, this.values.button.wml.id)
            .map((b: HTMLButtonElement) => b.removeAttribute('disabled'));

    }

    /**
     * toggle the disabled state of this button.
     */
    toggle() {

        getById<HTMLButtonElement>(this.view, this.values.button.wml.id)
            .map((b: HTMLButtonElement) => b.hasAttribute('disabled') ?
                this.enable() : this.disable());

    }

}
