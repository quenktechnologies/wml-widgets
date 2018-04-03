import * as wml from '@quenk/wml';
import * as views from './wml/button'
import * as style from '../../../../lib/content/style';
import * as size from '../../../../lib/content/size';
import { Page } from '../Page';

export class ButtonPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        capitalize: (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`,

        styles: <any>style,
        sizes: <any>size

    }

}
