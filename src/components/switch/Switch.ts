import { AbstractWidget } from '@quenk/wml/lib/runtime';
import { Main } from './wml/switch';

/**
 * Switch
 */
export class Switch extends AbstractWidget {

    view = new Main(this);

}
