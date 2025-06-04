import { View } from '@quenk/wml';

import { concat } from '../../../util';
import { getClassName, getId } from '../../../';
import { AbstractControl, getName } from '../../';
import { FileDropZoneView } from './views/drop-zone';
import {
    dispatchFileChangedEvent,
    FileChangedEvent,
    FileControlAttrs
} from '..';

export { FileChangedEvent };

/**
 * FileDropZoneAttrs
 */
export interface FileDropZoneAttrs extends FileControlAttrs {}

/**
 * FileDropZone provides an area where files can be drag and dropped onto.
 *
 * Click on the area will bring up the file picker dialog. Note that this
 * area fills all the available space of it's parent and is meant to be
 * embedded in other widgets.
 *
 * By itself, it provides no visual styles and its parent MUST be realtive
 * positioned with defined width and height otherwise it will overflow.
 */
export class FileDropZone extends AbstractControl<File, FileDropZoneAttrs> {
    view: View = new FileDropZoneView(this);

    value: File | undefined;

    values = {
        id: getId(this.attrs),

        className: concat('ww-file-drop-zone', getClassName(this.attrs)),

        name: getName(this.attrs),

        accept: this.attrs && this.attrs.accept ? this.attrs.accept : '',

        multiple:
            this.attrs && this.attrs.multiple ? this.attrs.multiple : undefined,

        stop: (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
        },

        drop: (e: DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.dataTransfer && e.dataTransfer.files.length > 0)
                this._dispatchChange(e.dataTransfer);
        },

        onchange: () => {
            let minput = this.view.findById<HTMLInputElement>('input');
            if (minput.isJust()) this._dispatchChange(minput.get());
        }
    };

    _dispatchChange(source: { files?: FileList | null }) {
        dispatchFileChangedEvent(this, source);
    }

    /**
     * unset the current file.
     */
    unset() {
        this.value = undefined;
        this._dispatchChange({});
    }
}
