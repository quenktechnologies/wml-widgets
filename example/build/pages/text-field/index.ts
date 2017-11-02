import * as wml from '@quenk/wml';
import * as views from './wml/text-field'
import { Page } from '../Page';
import { TextChangedEvent } from '@package/self/control/text-field';
import { FormControl, FormControlAttrs } from '@package/self/control';

export class TextFieldPage extends Page {

    id = 'text';

    view: wml.View = new views.Main(this);

    onChange = ({ value }: TextChangedEvent) => {

        (value === 'invalid') ?
            this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                c.setError('This control is now invalid!')) :
            (value === 'valid') ?
                this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                    c.setSuccess('This control is now valid!')) :
                (value === 'warn') ?
                    this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                        c.setWarning('This control now has a warning!')) :
                    (value === 'reset') ?
                        this.get(this.id, <V>(c: FormControl<V, FormControlAttrs<V>>) =>
                            c.reset()) :
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
