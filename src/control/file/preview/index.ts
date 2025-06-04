import { Component } from '@quenk/wml';

import { FileChangedEvent } from '../';
import { getClassName, HTMLElementAttrs } from '../../../';
import { BUSY } from '../../../content/busy-overlay';
import { ERROR } from '../../../content/style';
import { FilePreviewView } from './views/file-preview';

export { FileChangedEvent };

export interface FilePreviewAttrs extends HTMLElementAttrs {
    /**
     * file to preview.
     */
    file: File;

    /**
     * busy if set, will render a busy overlay over the preview.
     *
     * This can be used when uploading the file.
     */
    busy?: boolean;

    /**
     * error if specified will render the preview with the error validation
     * state.
     *
     * The string value is used for compatability with other widgets.
     */
    error?: boolean | string;

    /**
     * onDelete is called when the user clicks the delete button for the file.
     */
    onDelete?: (file: File) => void;
}

const sizes = ['Bytes', 'KB', 'MB', 'GB'];

export class FilePreview extends Component<FilePreviewAttrs> {
    view = new FilePreviewView(this);

    className = getClassName(
        this.attrs,
        'ww-file-preview',
        this.attrs.error ? ERROR : '',
        this.attrs.busy ? BUSY : ''
    );

    fileName = this.attrs.file.name;

    isBusy = this.attrs.busy;

    get fileSize() {
        let { size } = this.attrs.file;
        if (size === 0) return '0 Bytes';
        let k = 1024;
        let i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    onDelete = () => {
        if (this.attrs.onDelete) this.attrs.onDelete(this.attrs.file);
    };

    busy(state = true) {
        this.isBusy = state;
        this.view.invalidate();
    }
}
