import { Delegate } from '@package/wml-widgets/control';
import { FeedbackControlWidget } from '@package/wml-widgets/control/feedback-control';
import { FormControlWidgetValues } from './FormControlWidgetValues';
import { FormControl, FormControlAttrs } from '.';
/**
 * FormControlWidget implements the minimumn API required for a FormControl.
 */
export declare abstract class FormControlWidget<V, A extends FormControlAttrs<V>> extends FeedbackControlWidget<A> implements FormControl<V, A> {
    abstract values: FormControlWidgetValues;
    abstract value(): V;
    /**
     * delegate is read from the attrs passed to the FormControlWidget.
     *
     * If no delegate is found, an instance of DefaultDelegate is generated.
     */
    delegate: Delegate<V>;
}
