import * as wml from '@quenk/wml';
import * as views from './wml/input-group';

import { results as options } from '../../fixtures/data/results';

export class InputGroupPage {
    view: wml.View = new views.Main(this);

    values = {
        dropList: { options }
    };
}

export default new InputGroupPage();
