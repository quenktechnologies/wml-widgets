import * as G from '@package/self/content/Group';
import * as names from '@package/self/common/names';
import * as views from './wml/button';
import { concat } from '@package/self/common/util';
import { Renderable } from '@quenk/wml-runtime';

/**
 * GroupAttrs are the allowed attributes for <Group/>
 */
export interface GroupAttrs extends G.GroupAttrs {

    ww?: {
        class?: string,
        spaced?: boolean,
        content?: Renderable
    }

}

/**
 * Group multiple buttons into one element.
 */
export class Group extends G.Group<GroupAttrs> {

    view = new views.Group(this);

    getClass(): string {

        let list = [names.BUTTON_GROUP];

        if (this.attrs.ww) {

            if (this.attrs.ww.class)
                list.push(this.attrs.ww.class);

            if (this.attrs.ww.spaced)
                list.push(names.SPACED);

            return list.join(' ');

        } else {

            return '';

        }

    }

}

/**
 * ButtonAttrs are the allowed attributes for <Button/>
 */
export interface ButtonAttrs extends G.GroupAttrs {

    ww?: {
        id?: string,
        href?: string,
        variant?: string,
        size?: string,
        style?: string,
        class?: string,
        active?: boolean,
        disabled?: boolean,
        onClick?: (e: Event) => void,
        text?: string
        type?: string,
        name?: string,
        content?: Renderable
    }

};

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button extends G.Group<ButtonAttrs> {

    view = new views.Button(this);

    values = {

        id: {

            button: 'button'

        },
        class: {

            button: this.attrs.ww ?
                concat(names.BUTTON,
                    this.attrs.ww.variant || names.DEFAULT,
                    this.attrs.ww.style,
                    this.attrs.ww.active ?
                        names.ACTIVE : '',
                    this.attrs.ww.class) :
                names.BUTTON

        }

    };

    /**
     * disable this button.
     */
    disable(): void {

        this.view.findById<HTMLButtonElement>(this.values.id.button)
            .map(b => b.setAttribute('disabled', 'disabled'));

    }

    /**
     * enable this button.
     */
    enable(): void {

        this.view.findById<HTMLButtonElement>(this.values.id.button)
            .map(b => b.removeAttribute('disabled'));

    }

    rendered(): void {

        if (this.attrs.ww)
            if (this.attrs.ww.disabled)
                this.view.findById<HTMLButtonElement>(this.values.id.button)
                    .map(b => b.setAttribute('disabled', 'disabled'));

    }

}
