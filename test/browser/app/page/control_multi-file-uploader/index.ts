import * as views from './wml/multi-file-uploader';

import { Record } from '@quenk/noni/lib/data/record';

import { FilesChangedEvent } from '../../../../../lib/control/file/multi-uploader';

export class MultiFileUploaderPage {
    view = new views.Main(this);

    errors: Record<string> = {};

    value: File[] = [];

    onChange = (e: FilesChangedEvent) => {
        alert(`You selected the file "${e.value.length} files!"`);
    };

    onErrorChange = (e: FilesChangedEvent) => {
        let errors: Record<string> = {};
        for (let i = 0; i < e.value.length; i++) {
            if (e.value[i].size > 1024 * 1024) {
                errors[i] = `File at index ${i} is too big!`;
            }
        }
        this.errors = errors;
        this.value = e.value;
        this.view.invalidate();
    };
}

export default new MultiFileUploaderPage();
