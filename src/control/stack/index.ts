import * as views from './wml/stack';
//import * as close from '../../content/x/close';
import { View, Template } from '@quenk/wml';
import { concat } from '../../util';
import { ControlAttrs, Event, GenericControl } from '../';

///classNames:begin
export const STACK = 'ww-stack';
export const STACK_ELEMENT = 'ww-stack__element';
export const STACK_ELEMENT_CONTENT = 'ww-stack__element__content';
export const STACK_CLOSE_BUTTON = 'ww-stack__button';
///classNames:end

/**
 * ElementTemplate provides a template for rendering a stack element's UI.
 */
export type ElementTemplate<V> =
    (s: Stack<V>) => (value: V) => (idx: number) => Template;

/**
 * StackAttrs
 */
export interface StackAttrs<V> extends ControlAttrs<V[]> {

    /**
     * elementTemplate for rendering each member of the stack.
     */
    elementTemplate?: ElementTemplate<V>,

    /**
     * decorator is a function that turns a member into a string.
     */
    decorator?: (v: V) => string

    /**
     * onChange handler
     */
    onChange?: (e: StackChangedEvent<V>) => void

}

/**
 * StackChangedEvent is generated when the user removes an item from the stack.
 */
export class StackChangedEvent<V> extends Event<V[]> { }

/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
export class Stack<V> extends GenericControl<V[], StackAttrs<V>> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: 'stack',

            class: concat(STACK, this.attrs.ww.class),

            value: this.attrs.ww.value ? this.attrs.ww.value : [],

            fire: () => {

                if (this.attrs.ww.onChange)
                    this.attrs.ww.onChange(new StackChangedEvent<V>(
                        this.attrs.ww.name,
                        this.values.root.value.slice()));

                this.view.invalidate();

            }

        },
        element: {

            class: STACK_ELEMENT,

            template: (): any => this.attrs.ww.elementTemplate ?
                this.attrs.ww.elementTemplate(this) : views.content(this),

          content: {

            class : STACK_ELEMENT_CONTENT

          },

            close: (index: number | string) => () => {

                this.values.root.value.splice(Number(index), 1);
                this.values.root.fire();

            },
            decorator: this.attrs.ww.decorator ? this.attrs.ww.decorator : (v: V) => String(v)
        },
        close: {

            class: STACK_CLOSE_BUTTON

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
