import { View } from '@quenk/wml';
import { concat } from '../../util';
import { FileInputAttrs, FileChangedEvent } from '../file-input';
import { getClassName, getId } from '../../';
import { AbstractControl, getName } from '../';
import { FileUploadSurfaceView } from './wml/file-upload-surface';

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

        input: {

            className: FILE_UPLOAD_SURFACE_INPUT,

            name: getName(this.attrs),

            accept: (this.attrs.ww && this.attrs.ww.accept) ?
                this.attrs.ww.accept : '',

            onChange: (e: FileChangedEvent) => {

                this.values.text.value = e.value.name;

                if (this.attrs.ww && this.attrs.ww.onChange)
                    this.attrs.ww.onChange(e);
                console.error('invalids');
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
