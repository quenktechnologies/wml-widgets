import * as wml from '@quenk/wml';
import * as moment from 'moment';
import { Delegate } from '@package/self/control';
import { FormControlWidget } from '@package/self/control/form-control';
import { DateAttrs, DateValues } from '.';
/**
 * Date input.
 */
export declare class Date extends FormControlWidget<string, DateAttrs> {
    view: wml.View;
    delegate: Delegate<string>;
    date: {
        value: moment.Moment;
        sep: string;
        format: string;
    };
    values: DateValues;
    value(): string;
    /**
     * calculate the date based on the current value of the inputs.
     */
    calculate(): moment.Moment;
    /**
     * fireChange
     * @private
     */
    fireChange(): void;
}
