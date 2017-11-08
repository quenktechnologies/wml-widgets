import { ButtonSelectGroupAttrs } from './ButtonSelectGroupAttrs';
import { ButtonChangedEvent } from './ButtonChangedEvent';
import { ButtonSelectGroup } from './ButtonSelectGroup';
import { Maybe } from 'afpl/lib/monad/Maybe';

/**
 * ButtonSelect
 */
export class ButtonSelect<V> extends ButtonSelectGroup<V, V, ButtonSelectGroupAttrs<V, V>> {

    initialize(value?:V) : Maybe<V> {

      return Maybe.fromAny(value);

    }

    click(value: V): void {

        this.values.select.value = Maybe.fromAny(value);

        this.delegate.onChange(new ButtonChangedEvent(this.attrs.ww.name, value));

        this.view.invalidate();

    }

    isSelected(v: V): boolean {

        return this.values.select.value.cata(() => false, value => value === v);

    }

}
