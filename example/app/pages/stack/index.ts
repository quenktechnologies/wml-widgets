import * as wml from '@quenk/wml';
import * as views from './wml/stack'
import { Page } from '../Page';
import { StackChangedEvent } from '@package/wml-widgets/control/stack';

export interface Member { label: string, value: string }

const _getValues = () => [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' }];

const _getText = (m: Member[]) => m.map(({ label }) => label).join(',');

export class StackPage extends Page {

    view: wml.View = new views.Main(this);

    values = {

        values: _getValues(),
        text: _getText(_getValues()),
        decorator: (m: Member) => m.label

    };

    onChange = ({ value }: StackChangedEvent<{ label: string, value: string }>) => {

        if (value.length === 0)
            this.values.values = _getValues();

        this.values.text = _getText(this.values.values);
        this.view.invalidate();

    }

}
