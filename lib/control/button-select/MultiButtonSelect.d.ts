import { ButtonSelectGroupAttrs } from './ButtonSelectGroupAttrs';
import { ButtonSelectGroup } from './ButtonSelectGroup';
import { Maybe } from 'afpl/lib/monad/Maybe';
/**
 * MultiButtonSelect
 */
export declare class MultiButtonSelect<V> extends ButtonSelectGroup<V[], V, ButtonSelectGroupAttrs<V[], V>> {
    initialize(v?: V[]): Maybe<V[]>;
    click(v: V): void;
    isSelected(v: V): boolean;
}
