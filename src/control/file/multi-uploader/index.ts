import { Record } from '@quenk/noni/lib/data/record';

import { concat } from '../../../util';
import { FileChangedEvent } from '../';
import { AbstractControl } from '../../';
import { Event, ControlAttrs } from '../../';
import { getClassName, getId } from '../../..';
import { MultiFileUploaderView } from './views/multi-uploader';

export class FilesChangedEvent extends Event<File[]> {}

/**
 * MultiFileUploaderAttrs
 */
export interface MultiFileUploaderAttrs extends ControlAttrs<File[]> {
    /**
     * accept specifies the type of files that should be recommended by
     * the file uploader dialog.
     */
    accept?: string;

    /**
     * maxFiles to allow uploaded.
     *
     * Defaults to 10.
     */
    maxFiles?: number;

    /**
     * errors can contain error messages to display for each file index
     * specified.
     */
    errors?: Record<string>;

    /**
     * onChange handler.
     */
    onChange?: (e: FilesChangedEvent) => void;
}

/**
 * MultiFileUploader provides a surface for multiple file selection.
 *
 * The difference between this and FileUploader is it allows any amount of
 * filex (up to maxFiles) to be selected at once or consecutively.
 *
 * A preview is generated for each file.
 */
export class MultiFileUploader extends AbstractControl<
    File[],
    MultiFileUploaderAttrs
> {
    view = new MultiFileUploaderView(this);

    value = this.attrs.value ?? [];

    errors = this.attrs.errors ?? {};

    values = {
        id: getId(this.attrs),

        className: concat('ww-multi-file-uploader', getClassName(this.attrs)),

        uploader: {
            accept: this.attrs && this.attrs.accept ? this.attrs.accept : '',

            onChange: (e: FileChangedEvent) => {
                if (this.value.length >= (this.attrs.maxFiles ?? 10)) return;
                this.value.push(<File>e.value);
                this.dispatchChange();
            },

            onDone: () => {
                this.dispatchChange();
            }
        }
    };

    /**
     * getFileAt returns the file (if any) at the specified index.
     */
    getFileAt(idx: number) {
        return this.value[idx];
    }

    /**
     * getFileErrorAt returns the error (if any) for the file located at the
     * specified index.
     */
    getFileErrorAt(idx: number) {
        return this.errors[idx] ?? '';
    }

  /**
   * removeFile from the iternal list.
   *
   * This will invalidate the view.
   */
    removeFile(idx: number) {
        this.value = this.value.filter((_, n) => n !== idx);
        this.dispatchChange();
    }

    dispatchChange() {
        this.view.invalidate();
        this.attrs.onChange?.(
            new FilesChangedEvent(this.attrs.name ?? '', this.value)
        );
    }
}
