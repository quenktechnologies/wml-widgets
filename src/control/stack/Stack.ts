import * as wml from '@quenk/wml';
import * as names from '@package/wml-widgets/common/names';
import * as views from './wml/stack';
import { StackChangedEvent } from './StackChangedEvent';
import { StackAttrs } from './StackAttrs';
import { Member } from './Member';
import { Template } from './Template';

/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
export class Stack<M> extends wml.Component<StackAttrs<M>> {

    view: wml.View = new views.Main(this);

    template: Template<M> = this.attrs.ww.template ?
        this.attrs.ww.template : views.content;

    values = {

        id: {

            root: 'root',
            a: 'link'

        },
        class: {
            root: names.STACK,
            close: names.STACK_CLOSE,
            member: names.STACK_MEMBER
        },
        item: {

            template: this.template,

            close: (index: number | string) => () => {

                this.values.value.splice(Number(index), 1);
                this.fire();

            },
            decorator: this.attrs.ww.decorator ? this.attrs.ww.decorator : (m: Member<M>) => String(m)

        },
        value: this.attrs.ww.value ? this.attrs.ww.value : []

    };

    /**
     * push a new member onto the stack.
     */
    push(m: M): Stack<M> {

        this.values.value.push(m);
        this.fire();
        return this;

    }

    fire(): void {

        if (this.attrs.ww.onChange)
            this.attrs.ww.onChange(new StackChangedEvent(
                this.attrs.ww.name, this.values.value.slice()));

        this.view.invalidate();

    }

}
