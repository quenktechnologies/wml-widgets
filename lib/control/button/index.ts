import * as wml from '@quenk/wml';
import * as views from './wml/button';
import * as style from '../../content/style';
import * as active from '../../content/state/active';
import * as orientation from '../../content/orientation';
import { concat } from '../../util';
import { WidgetAttrs, StylableAttrs } from '../../';
import { Event } from '../';

///classNames:begin
export const BUTTON = 'ww-button';
///classNames:end

/**
 * ButtonAttrs
 */
export interface ButtonAttrs extends StylableAttrs {

    /**
     * size modifier for the button.
     */
    size?: string,

    /**
     * style assigns one of the supported styles.
     */
    style?: string,

    /**
     * class names that can be assigned to the button.
     */
    class?: string,

    /**
     * outline uses an alternative outline styling 
     */
    outline?: boolean,

    /**
     * active indicates whether the button is active or not.
     */
    active?: boolean,

    /**
     * disabled indicates whether the button is disabled or not.
     */
    disabled?: boolean,

    /**
     * block scope this button.
     */
    block?: boolean,

    /**
     * onClick assigns a handler for click events.
     */
    onClick?: (e: ButtonClickedEvent) => void,

    /**
     * text can be specified as an alternative to explicit children.
     */
    text?: string

    /**
     * type corresponds to the html attribute.
     */
    type?: string,

    /**
     * name of the button (used in event generation)
     */
    name?: string

};

/**
 * ButtonClickedEvent
 */
export class ButtonClickedEvent extends Event<void> {

    constructor(public name: string) { super(name, null); }

}

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button extends wml.Component<WidgetAttrs<ButtonAttrs>> {

    view: wml.View = new views.Main(this);

    values = {

        button: {

            id: 'button',

            class: this.attrs.ww ?
                concat(BUTTON,
                    this.attrs.ww.class,
                    this.attrs.ww.style || style.DEFAULT,
                    this.attrs.ww.size && this.attrs.ww.size,
                    this.attrs.ww.outline && style.OUTLINE,
                    this.attrs.ww.block && orientation.BLOCK,
                    this.attrs.ww.active && active.ACTIVE) : BUTTON,

            type: (this.attrs.ww && this.attrs.ww.type) ? this.attrs.ww.type : 'button',

            name: (this.attrs.ww && this.attrs.ww.name) ? this.attrs.ww.name : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled) ? true : null,

            onclick: () => this.attrs.ww &&
                this.attrs.ww.onClick &&
                this.attrs.ww.onClick(new ButtonClickedEvent(this.attrs.ww.name || '')),

            text: (this.attrs.ww && this.attrs.ww.text) ? this.attrs.ww.text : ''

        }

    };

    /**
     * disable this button.
     */
    disable(): void {

        this
            .view
            .findById(this.values.button.id)
            .map((b: HTMLButtonElement) => b.setAttribute('disabled', 'disabled'));

    }

    /**
     * enable this button.
     */
    enable(): void {

        this
            .view
            .findById(this.values.button.id)
            .map((b: HTMLButtonElement) => b.removeAttribute('disabled'));

    }

    /**
     * toggle the disabled state of this button.
     */
    toggle() {

        this
            .view
            .findById(this.values.button.id)
            .map((b: HTMLButtonElement) => b.hasAttribute('disabled') ?
                this.enable() :
                this.disable());

    }

}
