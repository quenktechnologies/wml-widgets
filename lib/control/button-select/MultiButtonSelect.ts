import { ButtonSelectGroupAttrs } from './ButtonSelectGroupAttrs';
import { ButtonChangedEvent } from './ButtonChangedEvent';
import { ButtonSelectGroup } from './ButtonSelectGroup';
import { Maybe } from 'afpl/lib/monad/Maybe';

/**
 * MultiButtonSelect
 */
export class MultiButtonSelect<V> extends ButtonSelectGroup<V[], V, ButtonSelectGroupAttrs<V[], V>> {

    initialize(v?: V[]): Maybe<V[]> {

        return Maybe.fromAny(v).cata(() => Maybe.fromArray([]), v => Maybe.fromArray(v))

    }

    click(v: V): void {

        this.values.select.value = this
            .values
            .select
            .value
            .map(value => {

                let pos = value.indexOf(v);

                if (pos > -1)
                    value.splice(pos, 1);
                else
                    value.push(v);

                this.delegate.onChange(
                    new ButtonChangedEvent(this.attrs.ww.name, value.slice()));

                this.view.invalidate();

              return value;

            })
            .orJust(() => [v]);

    }

    isSelected(v: V) {

        return this.values.select.value.cata(() => false, value => value.indexOf(v) > -1);

    }

}
