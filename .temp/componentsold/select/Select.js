import { View } from '@quenk/wml/lib/runtime';
import Input from '../input/Input';
import layout from './wml/layout.wml';

class Select extends Input {

    constructor(attrs, children) {

        super(attrs, children);
        this.view = new View(layout, this);

    }

}

export default Select
