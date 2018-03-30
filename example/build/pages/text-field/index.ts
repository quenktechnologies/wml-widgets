import * as wml from '@quenk/wml';
import * as views from './wml/text-field'
import { Page } from '../Page';
import { TextChangedEvent } from '../../../../lib/control/text-field';
import { FormControl, FormControlAttrs } from '../../../../lib/control/form-control';

export class TextFieldPage extends Page {

    id = 'text';

    view: wml.View = new views.Main(this);

    onChange = ({ value }: TextChangedEvent) => {

        (value === 'error') ?
            this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                c.setError('This control is now in the error state!')) :
            (value === 'success') ?
                this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                    c.setSuccess('This control is now in the success state!')) :
                (value === 'warning') ?
                    this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                        c.setWarning('This control now in the warning state!')) :
                    (value === 'clear') ?
                        this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                            c.clear()) :
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
