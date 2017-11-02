import { ButtonSelectGroupAttrs } from './ButtonSelectGroupAttrs';
import { ButtonSelectGroup } from './ButtonSelectGroup';
import { Maybe } from 'afpl/lib/monad/Maybe';
/**
 * ButtonSelect
 */
export declare class ButtonSelect<V> extends ButtonSelectGroup<V, V, ButtonSelectGroupAttrs<V, V>> {
    initialize(value?: V): Maybe<V>;
    click(value: V): void;
    isSelected(v: V): boolean;
}
