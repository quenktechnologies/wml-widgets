import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import { FeedbackControl, FeedbackControlValues, hasClass } from '.';

/**
 * FeedbackControlWidget is a minimal implementation of FeedbackControl
 */
export abstract class FeedbackControlWidget<A extends wml.Attrs>
    extends wml.Component<A> 
  implements FeedbackControl<A> {

    abstract values: FeedbackControlValues;

    /**
     * setState helper for changing the state of the displayed DOM.
     */
    setState(state: string): FeedbackControlWidget<A> {

        return this
            .view
            .findById(this.values.root.id)
            .map((e: HTMLElement) => e.classList.add(state))
            .cata(() => this, () => this);

    }

    hasError(): boolean {

        return hasClass(names.ERROR, this.values.root.id, this.view);

    }

    hasWarning(): boolean {

        return hasClass(names.WARNING, this.values.root.id, this.view);

    }

    hasSuccess(): boolean {

        return hasClass(names.SUCCESS, this.values.root.id, this.view);

    }

    setMessage(msg: string): FeedbackControlWidget<A> {

        return this
            .view
            .findById(this.values.help.id)
            .map((message: HTMLElement) => {

                var node = document.createTextNode(msg);

                if (message.firstChild) {
                    message.replaceChild(node, message.firstChild);
                } else {
                    message.appendChild(node);
                }

            })
            .cata(() => this, () => this);

    }

    clear(): FeedbackControlWidget<A> {

        return this
            .view
            .findById(this.values.root.id)
            .map((h: HTMLElement) => {

                h.classList.remove(names.SUCCESS);
                h.classList.remove(names.ERROR);
                h.classList.remove(names.WARNING);

            })
            .cata(() => this, () => this);

    }

    setSuccess(message: string): FeedbackControlWidget<A> {

        return this
            .clear()
            .setMessage(message)
            .setState(names.SUCCESS);

    }

    /**
     * setError
     */
    setError(message: string): FeedbackControlWidget<A> {

        return this
            .clear()
            .setMessage(message)
            .setState(names.ERROR);

    }

    /**
     * setWarning
     */
    setWarning(message: string): FeedbackControlWidget<A> {

        return this
            .clear()
            .setMessage(message)
            .setState(names.WARNING);

    }

}


