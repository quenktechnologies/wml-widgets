import { View } from '@quenk/wml';
import { concat } from '../../util';
import { FileInputAttrs, FileChangedEvent, list2Array } from '../file-input';
import { getClassName, getId } from '../../';
import { AbstractControl, getName } from '../';
import { FileUploadSurfaceView } from './wml/file-upload-surface';

export { FileChangedEvent }

export const INSTRUCTION_TEXT = 'Choose a file';

///classNames:begin
export const FILE_UPLOAD_SURFACE = 'ww-file-upload-surface';
export const FILE_UPLOAD_SURFACE_INPUT = 'ww-file-upload-surface__input';
export const FILE_UPLOAD_SURFACE_TEXT = 'ww-file-upload-surface__text';
///classNames:end

/**
 * FileUploadSurfaceAttrs
 */
export interface FileUploadSurfaceAttrs extends FileInputAttrs { }

/**
 * FileUploadSurface provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
export class FileUploadSurface
    extends
    AbstractControl<File, FileUploadSurfaceAttrs> {

    view: View = new FileUploadSurfaceView(this);

    values = {

        id: getId(this.attrs),

        className: concat(FILE_UPLOAD_SURFACE, getClassName(this.attrs)),

        stop: (e: Event) => {

            e.stopPropagation();
            e.preventDefault();

        },

        drop: (e: DragEvent) => {

            e.stopPropagation();
            e.preventDefault();

            let name = (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : '';

            if (e.dataTransfer && e.dataTransfer.files.length > 0)
                this.values.input.onChange(new FileChangedEvent(name,
                    list2Array(e.dataTransfer.files)));

        },

        input: {

            className: FILE_UPLOAD_SURFACE_INPUT,

            name: getName(this.attrs),

            accept: (this.attrs.ww && this.attrs.ww.accept) ?
                this.attrs.ww.accept : '',

            multiple: (this.attrs.ww && this.attrs.ww.multiple) ?
                this.attrs.ww.multiple : undefined,

            onChange: (e: FileChangedEvent) => {

                this.values.text.value = e.value[0].name;

                if (this.attrs.ww && this.attrs.ww.onChange)
                    this.attrs.ww.onChange(e);

                this.view.invalidate();

            }

        },
        text: {

            className: FILE_UPLOAD_SURFACE_TEXT,

            value: (this.attrs.ww && this.attrs.ww.text) ?
                this.attrs.ww.text : INSTRUCTION_TEXT

        }

    }

}
