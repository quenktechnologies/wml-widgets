import * as G from '@package/self/content/Group';
import * as views from './wml/button';
import { Renderable } from '@quenk/wml';
/**
 * GroupAttrs are the allowed attributes for <Group/>
 */
export interface GroupAttrs extends G.GroupAttrs {
    ww?: {
        class?: string;
        spaced?: boolean;
        content?: Renderable;
    };
}
/**
 * Group multiple buttons into one element.
 */
export declare class Group extends G.Group<GroupAttrs> {
    view: views.Group;
    getClass(): string;
}
/**
 * ButtonAttrs are the allowed attributes for <Button/>
 */
export interface ButtonAttrs extends G.GroupAttrs {
    ww?: {
        id?: string;
        href?: string;
        variant?: string;
        size?: string;
        style?: string;
        class?: string;
        active?: boolean;
        disabled?: boolean;
        onClick?: (e: Event) => void;
        text?: string;
        type?: string;
        name?: string;
        content?: Renderable;
    };
}
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends G.Group<ButtonAttrs> {
    view: views.Button;
    values: {
        id: {
            button: string;
        };
        button: {
            class: string;
            type: string;
            name: string;
            disabled: boolean;
            onclick: (e: Event) => void;
            text: string;
        };
    };
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
