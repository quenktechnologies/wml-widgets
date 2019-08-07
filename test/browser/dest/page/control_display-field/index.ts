import * as wml from '@quenk/wml';
import * as views from './wml/display-field';
import { Style } from '../../../../../lib/content/style';

const getStyles = () => <Style[]>[
    Style.Default,
    Style.Primary,
    Style.Success,
    Style.Info,
    Style.Warning,
    Style.Error
];

export class DisplayFieldPage {

    view: wml.View = new views.Main(this);

    values = {

        capitalize: (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`,

        styles: getStyles()

    }

}

export default new DisplayFieldPage();
