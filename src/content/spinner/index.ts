import { Component } from '@quenk/wml';

import { getClassName, HTMLElementAttrs } from '../..';
import { concat } from '../../util';

import { SpinnerView } from './views/spinner';

/**
 * SpinnerAttrs
 */
export interface SpinnerAttrs extends HTMLElementAttrs {}

/**
 * Spinner for busy states.
 */
export class Spinner extends Component<SpinnerAttrs> {
    view = new SpinnerView(this);

    values = {
        className: concat('ww-spinner', getClassName(this.attrs))
    };
}
