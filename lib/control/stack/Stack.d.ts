import * as wml from '@quenk/wml';
import { StackAttrs } from './StackAttrs';
import { Member } from './Member';
import { Template } from './Template';
/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
export declare class Stack<M> extends wml.Component<StackAttrs<M>> {
    view: wml.View;
    template: Template<M>;
    values: {
        id: {
            root: string;
            a: string;
        };
        class: {
            root: string;
            close: string;
            member: string;
        };
        item: {
            template: Template<M>;
            close: (index: string | number) => () => void;
            decorator: (m: Member<M>) => string;
        };
        value: Member<M>[];
    };
    /**
     * push a new member onto the stack.
     */
    push(m: M): Stack<M>;
    fire(): void;
}
