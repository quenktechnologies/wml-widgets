import * as $wml from '@quenk/wml';
import { ButtonSelectGroup } from '../ButtonSelectGroup';
import { ButtonSelectGroupAttrs } from '../ButtonSelectGroupAttrs';
export declare class Main<V, OV, A extends ButtonSelectGroupAttrs<V, OV>> extends $wml.AppView<ButtonSelectGroup<V, OV, A>> {
    constructor(context: ButtonSelectGroup<V, OV, A>);
}
