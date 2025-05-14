import * as wml from '@quenk/wml';
import * as views from './wml/tag';
import { DismissEvent } from '../../../../../lib/control/tag';
import { Style } from '../../../../../lib/content/style';

const getStyles = () =>
    <Style[]>[
        Style.Default,
        Style.Primary,
        Style.Success,
        Style.Info,
        Style.Warning,
        Style.Error
    ];

export class TagPage {
    view: wml.View = new views.Main(this);

    values = {
        capitalize: (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`,

        styles: getStyles(),

        onDismiss: (e: DismissEvent) => {
            let idx = this.values.styles.indexOf(<Style>e.name);

            if (idx > -1) this.values.styles.splice(idx, 1);

            if (this.values.styles.length === 0)
                this.values.styles = getStyles();

            this.view.invalidate();
        }
    };
}

export default new TagPage();
