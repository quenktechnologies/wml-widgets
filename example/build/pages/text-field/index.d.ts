import * as wml from '@quenk/wml';
import { Page } from '../Page';
import { TextChangedEvent } from '@package/wml-widgets/control/text-field';
export declare class TextFieldPage extends Page {
    id: string;
    view: wml.View;
    onChange: ({value}: TextChangedEvent) => void;
}
