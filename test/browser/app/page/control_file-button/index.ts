import * as views from './wml/button';

import { FileDropZonePage } from '../control_file-drop-zone';
import { FileChangedEvent } from '../../../../../lib/control/file';
import { FileButton } from '../../../../../lib/control/file/button';

export class FileButtonPage extends FileDropZonePage {
    view = new views.Main(this);

    error = 'This one shows errors.';

    value = new File([], 'foo');

    onErrorChange = (e: FileChangedEvent) => {
        if (e.value) {
            if (e.value.size > 1024 * 1024) {
                this.error = `File must be <=1024kb, it is ${e.value.size / 1024}Kbs!`;
                this.view.invalidate();
            }
        }
    };

    onBusyChange = () => {
        let mbtn = this.view.findById<FileButton>('busy');

        if (mbtn.isJust()) {
            let btn = mbtn.get();
            btn.busy();
            setTimeout(() => btn.busy(false), 5000);
        }
    };
}

export default new FileButtonPage();
