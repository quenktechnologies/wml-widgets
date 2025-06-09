import * as wml from '@quenk/wml';
import * as views from './wml/file-drop-zone';

import { FileChangedEvent } from '../../../../../lib/control/file';

export class FileDropZonePage {
    view: wml.View = new views.Main(this);

    multiple = false;

    onChange = (e: FileChangedEvent) => {
        alert(
            e.value
                ? `You selected the file "${(<File>e.value).name}!"`
                : 'You removed the file!'
        );
    };

    onSwitch = () => {
        this.multiple = !this.multiple;
        this.view.invalidate();
    };
}

export default new FileDropZonePage();
