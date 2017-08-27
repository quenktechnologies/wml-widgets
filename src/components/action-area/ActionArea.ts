import * as Styles from 'wml-widgets-common/Styles';
import * as common from 'wml-widgets-common';
import { Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/action_area';

export interface ActionAreaAttrs extends Attrs { }
/**
 * ActionArea
 */
export class ActionArea extends common.Container<ActionAreaAttrs> {

    view = new Main(this);

}

export default ActionArea
