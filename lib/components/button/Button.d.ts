import * as wml from '@quenk/wml-runtime';
import * as common from 'wml-widgets-common';
import * as views from './wml/button';
/**
 * GroupAttrs are the allowed attributes for <Group/>
 */
export interface GroupAttrs extends wml.Attrs {
    ww?: {
        class?: string;
        spaced?: boolean;
    };
}
/**
 * Group multiple buttons into one element.
 */
export declare class Group extends common.Container<GroupAttrs> {
    view: views.Group<this>;
    getClass(): string;
}
/**
 * ButtonAttrs are the allowed attributes for <Button/>
 */
export interface ButtonAttrs extends wml.Attrs {
    ww?: {
        id?: string;
        href?: string;
        variant?: string;
        size?: string;
        style?: string;
        class?: string;
        disabled?: boolean;
        onClick?: (e: Event) => void;
        text?: string;
        type?: string;
        name?: string;
    };
}
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends common.Container<ButtonAttrs> {
    view: views.Button<this>;
    /**
     * disable this button.
     */
    disable(): void;
    /**
     * enable this button.
     */
    enable(): void;
    rendered(): void;
}
export default Button;
