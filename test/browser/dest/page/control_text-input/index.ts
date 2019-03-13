import * as wml from '@quenk/wml';
import * as views from './wml/text-input'
import { Size } from '../../../../../lib/content/size';
import { TextChangedEvent } from '../../../../../lib/control/text-input';

export class TextInputPage {

    view: wml.View = new views.Main(this);

        sizes =  <Size[]>[
            Size.ExtraSmall,
            Size.Small,
            Size.Medium,
            Size.Large,
            Size.ExtraLarge
        ]

    content = () => document.createTextNode('this');

    onChange = ({ value }: TextChangedEvent) => {

        this
            .view
            .findById<HTMLElement>('txt')
            .map(h => h.innerHTML = value);

    }

}

export default new TextInputPage()
