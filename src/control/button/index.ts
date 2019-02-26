import * as views from './wml/button';
import { View } from '@quenk/wml';
import { TOOLBAR_COMPAT } from '../toolbar';
import { ACTIVE } from '../../content/state/active';
import { BLOCK } from '../../content/orientation';
import { DEFAULT, OUTLINE, Style, getStyleClassName } from '../../content/style';
import {Size,getSizeClassName} from '../../content/size';
import { concat, getById } from '../../util';
import { getClassName, getId, textNode } from '../../';
import { ControlAttrs, AbstractControl, Event } from '../';

export { Style }

///classNames:begin
export const BUTTON = 'ww-button';
///classNames:end

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
    onClick?: (e: ButtonClickedEvent<V>) => void,

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
export class ButtonClickedEvent<V> extends Event<V> { }

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button<V> extends AbstractControl<V, ButtonAttrs<V>> {

    view: View = new views.Main(this);

    values = {

        button: {

            wml: {

                id: 'button'

            },

            id: getId(this.attrs),

            className: concat(BUTTON,

                getClassName(this.attrs),

                TOOLBAR_COMPAT,

                (this.attrs.ww && this.attrs.ww.style) ?
                    getStyleClassName(this.attrs.ww.style) :
                    DEFAULT,

                (this.attrs.ww && this.attrs.ww.size) ?
                  getSizeClassName(this.attrs.ww.size) : '',

                (this.attrs.ww && this.attrs.ww.outline) ?
                    OUTLINE : '',

                (this.attrs.ww && this.attrs.ww.block) ?
                    BLOCK : '',

                (this.attrs.ww && this.attrs.ww.active) ?
                    ACTIVE : ''),


            type: (this.attrs.ww && this.attrs.ww.type) ?
                this.attrs.ww.type : 'button',

            name: (this.attrs.ww && this.attrs.ww.name) ? this.attrs.ww.name : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled) ? true : null,

            onclick: () => this.attrs.ww &&
                this.attrs.ww.onClick &&
                this.attrs.ww.onClick(new ButtonClickedEvent(
                    (this.attrs.ww && this.attrs.ww.name) ?
                        this.attrs.ww.name : '', <V>this.attrs.ww.value)),

            content: () => (this.attrs.ww && this.attrs.ww.text) ?
                [textNode(this.attrs.ww.text)] : this.children

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
