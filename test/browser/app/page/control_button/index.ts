import * as wml from '@quenk/wml';
import * as views from './wml/button'
import { Style } from '../../../../../lib/content/style';
import { Size } from '../../../../../lib/content/size';

export class ButtonPage {

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
      ],
      sizes: <Size[]>[
        Size.ExtraSmall,
        Size.Small,
        Size.Medium,
        Size.Large,
        Size.ExtraLarge
      ]

    }

}

export default new ButtonPage();
