import { Delegate, DefaultDelegate } from '../../control';
import { FeedbackControlWidget } from '../../control/feedback-control';
import { FormControlWidgetValues } from './FormControlWidgetValues';
import { FormControl, FormControlAttrs } from '.';

/**
 * FormControlWidget implements the minimumn API required for a FormControl.
 */
export abstract class FormControlWidget<V, A extends FormControlAttrs<V>>
    extends FeedbackControlWidget<A>
    implements FormControl<V, A> {

    abstract values: FormControlWidgetValues;

    abstract value(): V;

      /**
       * delegate is read from the attrs passed to the FormControlWidget.
       *
       * If no delegate is found, an instance of DefaultDelegate is generated.
       */
    delegate: Delegate<V> =
    (this.attrs.ww && this.attrs.ww.delegate) ?
        this.attrs.ww.delegate : new DefaultDelegate(this.attrs.ww);



}


