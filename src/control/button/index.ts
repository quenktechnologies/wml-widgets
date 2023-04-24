import * as views from './wml/button';

import { isObject, isString } from '@quenk/noni/lib/data/type';

import { createElement, text } from '@quenk/wml/lib/dom';
import { Content, View } from '@quenk/wml';

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
export const BUTTON_IMAGE = 'ww-button-image';
export const BUTTON_TEXT = 'ww-button-text';
///classNames:end

/**
 * ImageUrl is a string pointing to an image resource.
 */
export type ImageUrl = string;

/**
 * ButtonClickedEventHandler is a callback for button clicks.
 */
export type ButtonClickedEventHandler<V> = (e: ButtonClickedEvent<V>) => void

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
     * icon to generate for the button.
     *
     * If a url, an img element is created.
     */
    icon?: ImageUrl | View,

    /**
     * onClick assigns a handler for click events.
     */
    onClick?: ButtonClickedEventHandler<V>,

    /**
     * anchor if true will render an anchor instead of a button.
     * @deprecated
     */
    anchor?: boolean,

    /**
     * href if specified, renders the button as a link.
     */
    href?: string,

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

    view: View = this.attrs.href ?
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

            href: this.attrs.href || '#',

            onclick: (e: Event) => {

                if (isString(this.attrs.href))
                    return;

                if (!this.attrs.onClick) return;

                e.preventDefault();

                this.attrs.onClick(new ButtonClickedEvent(
                    this.attrs.name ?
                        this.attrs.name : '', <V>this.attrs.value))

            },

            content: () => {

                let content: Content[] = [];

                if (isString(this.attrs.icon))
                    content.push(createElement('img', {
                        alt: 'icon',
                        class: BUTTON_IMAGE,
                        src: this.attrs.icon
                    }));

                if (isObject(this.attrs.icon))
                    content = [this.attrs.icon.render()];

                if (this.attrs.text)
                    content.push(createElement('span', {
                        class: BUTTON_TEXT
                    }, [text(this.attrs.text)]));

                return [...content, ...this.children];

            }
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
