import * as wml from '@quenk/wml';
import * as names from '@package/wml-widgets/common/names';
import * as views from './wml/button-select';
import { FormControlWidget } from '@package/wml-widgets/control/form-control';
import { concat } from '@package/wml-widgets/common/util';
import { Option } from './Option';
import { ButtonSelectGroupAttrs } from './ButtonSelectGroupAttrs';
import { Maybe } from 'afpl/lib/monad/Maybe';

/**
 * ButtonSelectGroup
 */
export abstract class ButtonSelectGroup<V, OV, A extends ButtonSelectGroupAttrs<V, OV>>
    extends FormControlWidget<V, A> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            id: 'root',
            class: names.BUTTON_SELECT

        },
        help: {

            id: 'help',
            success: this.attrs.ww.success,
            error: this.attrs.ww.error,
            warning: this.attrs.ww.warning

        },
        select: {

            value: this.initialize(this.attrs.ww.value),
            options: this.attrs.ww.options,
            isSelected: (v: OV) => this.isSelected(v)

        },
        click: (v: OV) => () => this.click(v),
        calculateClass: ({ className, value }: Option<OV>) =>
            concat(names.BUTTON_SELECT_OPTION, className,
                (this.attrs.ww.variant) ? this.attrs.ww.variant : names.DEFAULT,
                this.values.select.isSelected(value) ? names.ACTIVE : ''),

    };

    abstract initialize(v: V): Maybe<V>;

    abstract click(v: OV): void;

    abstract isSelected(v: OV): boolean;

    value(): V {

        return this.values.select.value.cata(()=>null, v=>v);

    }

}
