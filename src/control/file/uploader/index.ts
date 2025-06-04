import { View } from '@quenk/wml';

import { FileChangedEvent, FileControlAttrs } from '../';
import { AbstractControl, getName } from '../../';
import { getClassName, getId } from '../../../';
import { FileUploaderView } from './views/uploader';
import { ERROR } from '../../../content/style';
import { BUSY } from '../../../content/busy-overlay';

export { FileChangedEvent };

/**
 * FileUploaderAttrs
 */
export interface FileUploaderAttrs extends FileControlAttrs {
    /**
     * error message to display.
     */
    error?: string;

    /**
     * text displayed as instructions to the user.
     */
    text?: string;
}

/**
 * FileUploader provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
export class FileUploader extends AbstractControl<File, FileUploaderAttrs> {
    view: View = new FileUploaderView(this);

    id = getId(this.attrs);

    get className() {
        return getClassName(
            this.attrs,
            'ww-file-uploader',
            this.error ? ERROR : '',
            this.isBusy ? BUSY : ''
        );
    }

    isBusy = false;

    error = this.attrs.error ?? '';

    value = this.attrs.value;

    preview = {
        onDelete: () => {
            this.dispatchChange(new FileChangedEvent(this.attrs.name ?? ''));
        }
    };

    zone = {
        name: getName(this.attrs),

        accept: this.attrs && this.attrs.accept ? this.attrs.accept : '',

        text: this.attrs.text,

        onChange: (e: FileChangedEvent) => {
            this.dispatchChange(e);
        }
    };

    dispatchChange(e: FileChangedEvent) {
        this.value = e.value;
        this.error = '';
        this.view.invalidate();
        this.attrs.onChange?.(e);
    }
}
