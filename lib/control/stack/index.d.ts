import * as views from './wml/stack';
import { Fun } from '@quenk/wml';
import { ControlAttrs, Event, AbstractControl } from '../';
export declare const STACK = "ww-stack";
export declare const STACK_ELEMENT = "ww-stack__element";
export declare const STACK_ELEMENT_CONTENT = "ww-stack__element__content";
export declare const STACK_CLOSE_BUTTON = "ww-stack__button";
/**
 * ElementTemplate provides a template for rendering a stack element's UI.
 */
export declare type ElementTemplate<V> = (s: Stack<V>) => (value: V) => (idx: number) => Fun;
/**
 * StackAttrs
 */
export interface StackAttrs<V> extends ControlAttrs<V[]> {
    /**
     * elementTemplate for rendering each member of the stack.
     */
    elementTemplate?: ElementTemplate<V>;
    /**
     * decorator is a function that turns a member into a string.
     */
    decorator?: (v: V) => string;
    /**
     * onChange handler
     */
    onChange?: (e: StackChangedEvent<V>) => void;
}
/**
 * StackChangedEvent is generated when the user removes an item from the stack.
 */
export declare class StackChangedEvent<V> extends Event<V[]> {
}
/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
export declare class Stack<V> extends AbstractControl<V[], StackAttrs<V>> {
    view: views.Main<V>;
    values: {
        root: {
            id: string;
            className: string;
            value: V[];
            fire: () => void;
        };
        element: {
            className: string;
            template: (v: V) => (idx: number) => any;
            content: {
                className: string;
            };
            close: (index: string | number) => () => void;
            decorator: (v: V) => Text;
        };
        close: {
            className: string;
        };
    };
    /**
     * push a new member onto the stack.
     */
    push(value: V): Stack<V>;
}
