import * as wml from '@quenk/wml';
import * as views from './wml/text-field'
import { Page } from '../Page';
import { TextChangedEvent } from '../../../../lib/control/text-field';
import { FormControl, FormControlAttrs } from '../../../../lib/control/form';

export class TextFieldPage extends Page {

    id = 'text';

    view: wml.View = new views.Main(this);

    onChange = ({ value }: TextChangedEvent) => {

        (value === 'error') ?
            this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                c.error('This control is now in the error state!')) :
            (value === 'success') ?
                this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                    c.success('This control is now in the success state!')) :
                (value === 'warning') ?
                    this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                        c.warning('This control now in the warning state!')) :
                    (value === 'neutral') ?
                        this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                            c.neutral()) :
                        this
                            .view
                            .findById('content')
                            .map((e: HTMLElement) => {

                                while (e.lastChild)
                                    e.removeChild(e.lastChild);

                                e.appendChild(document.createTextNode(value));

                            });


    }


}
