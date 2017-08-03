import { Component, Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/switch';

export interface SwitchAttrs extends Attrs {

    ww?: {

        name?: string,
        value?: string,
        onChange?: (e: Event) => void

    }

}

/**
 * Switch
 */
export class Switch extends Component<SwitchAttrs> {

    view = new Main(this);

}
