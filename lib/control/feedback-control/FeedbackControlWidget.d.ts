import * as wml from '@quenk/wml';
import { FeedbackControl, FeedbackControlValues } from '.';
/**
 * FeedbackControlWidget is a minimal implementation of FeedbackControl
 */
export declare abstract class FeedbackControlWidget<A extends wml.Attrs> extends wml.Component<A> implements FeedbackControl<A> {
    abstract values: FeedbackControlValues;
    /**
     * setState helper for changing the state of the displayed DOM.
     */
    setState(state: string): FeedbackControlWidget<A>;
    hasError(): boolean;
    hasWarning(): boolean;
    hasSuccess(): boolean;
    setMessage(msg: string): FeedbackControlWidget<A>;
    clear(): FeedbackControlWidget<A>;
    setSuccess(message: string): FeedbackControlWidget<A>;
    /**
     * setError
     */
    setError(message: string): FeedbackControlWidget<A>;
    /**
     * setWarning
     */
    setWarning(message: string): FeedbackControlWidget<A>;
}
