import * as wml from '@quenk/wml';
import * as views from './wml/alert';
import { Style } from '../../../../../lib/content/style';

export class AlertPage {
    view: wml.View = new views.Main(this);

    values = {
        capitalize: (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`,

        message: 'This is an alert',

        styles: <Style[]>[
            Style.Default,
            Style.Primary,
            Style.Success,
            Style.Info,
            Style.Warning,
            Style.Error
        ]
    };
}

export default new AlertPage();
