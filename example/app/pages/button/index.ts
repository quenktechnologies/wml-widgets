import * as wml from '@quenk/wml';
import * as views from './wml/button'
import { ClassMap, styles, sizes } from '@package/wml-widgets/util/class-names';
import { Page } from '../Page';

export {ClassMap as __};

export class ButtonPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        capitalize: (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`,

        styles,
        sizes

    }

}
