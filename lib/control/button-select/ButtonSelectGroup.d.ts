import * as wml from '@quenk/wml';
import { FormControlWidget } from '@package/self/control/form-control';
import { Option } from './Option';
import { ButtonSelectGroupAttrs } from './ButtonSelectGroupAttrs';
import { Maybe } from 'afpl/lib/monad/Maybe';
/**
 * ButtonSelectGroup
 */
export declare abstract class ButtonSelectGroup<V, OV, A extends ButtonSelectGroupAttrs<V, OV>> extends FormControlWidget<V, A> {
    view: wml.View;
    values: {
        root: {
            id: string;
            class: string;
        };
        help: {
            id: string;
            success: string;
            error: string;
            warning: string;
        };
        select: {
            value: Maybe<V>;
            options: Option<OV>[];
            isSelected: (v: OV) => boolean;
        };
        click: (v: OV) => () => void;
        calculateClass: ({className, value}: Option<OV>) => string;
    };
    abstract initialize(v: V): Maybe<V>;
    abstract click(v: OV): void;
    abstract isSelected(v: OV): boolean;
    value(): V;
}
