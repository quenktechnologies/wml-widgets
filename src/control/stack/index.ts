import * as views from './wml/stack';

import { View } from '@quenk/wml';
import { text } from '@quenk/wml/lib/dom';

import { concat } from '../../util';
import { getId, getClassName } from '../../';
import { ControlAttrs, Event, AbstractControl } from '../';

///classNames:begin
export const STACK = 'ww-stack';
export const STACK_ELEMENT = 'ww-stack__element';
export const STACK_ELEMENT_CONTENT = 'ww-stack__element__content';
export const STACK_CLOSE_BUTTON = 'ww-stack__button';
///classNames:end

/**
 * ElementTemplate provides a template for rendering a stack element's UI.
 */
export type ElementTemplate<V> = (s: Stack<V>, value: V, idx: number) => View;

/**
 * StackAttrs
 */
export interface StackAttrs<V> extends ControlAttrs<V[]> {
    /**
     * disabled
     */
    disabled?: boolean;

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
export class StackChangedEvent<V> extends Event<V[]> {}

/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
export class Stack<V> extends AbstractControl<V[], StackAttrs<V>> {
    view: views.Main<V> = new views.Main(this);

    values = {
        root: {
            id: getId(this.attrs),

            className: concat(STACK, getClassName(this.attrs)),

            disabled:
                this.attrs && this.attrs.disabled ? this.attrs.disabled : false,

            value: this.attrs && this.attrs.value ? this.attrs.value : [],

            fire: () => {
                if (!this.values.root.disabled) {
                    if (this.attrs && this.attrs.onChange)
                        this.attrs.onChange(
                            new StackChangedEvent<V>(
                                <string>this.attrs.name,
                                this.values.root.value.slice()
                            )
                        );

                    this.view.invalidate();
                }
            }
        },
        element: {
            className: STACK_ELEMENT,

            template: (v: V, idx: number): any =>
                this.attrs && this.attrs.elementTemplate
                    ? this.attrs.elementTemplate(this, v, idx)
                    : new views.DefaultTemplate({
                          stack: this,
                          value: v,
                          index: idx
                      }),

            content: {
                className: STACK_ELEMENT_CONTENT
            },

            close: (index: number | string) => () => {
                this.values.root.value.splice(Number(index), 1);
                this.values.root.fire();
            },
            decorator: (v: V) =>
                text(
                    this.attrs && this.attrs.decorator
                        ? this.attrs.decorator(v)
                        : v + ''
                )
        },
        close: {
            className: STACK_CLOSE_BUTTON
        }
    };

    /**
     * push a new member onto the stack.
     */
    push(value: V): Stack<V> {
        this.values.root.value.push(value);
        this.values.root.fire();
        return this;
    }
}
