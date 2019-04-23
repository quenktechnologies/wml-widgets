import * as wml from '@quenk/wml';
import * as views from './wml/callout'
import { Style } from '../../../../../lib/content/style';

export class CalloutPage {

    view: wml.View = new views.Main(this);

    values = {

        capitalize: (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`,

        styles: <Style[]>[
            Style.Default,
            Style.Primary,
            Style.Success,
            Style.Info,
            Style.Warning,
            Style.Error
        ]

    }

}

export default new CalloutPage();
