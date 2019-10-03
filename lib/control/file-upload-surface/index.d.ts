import { View } from '@quenk/wml';
import { FileInputAttrs, FileChangedEvent } from '../file-input';
import { AbstractControl } from '../';
export { FileChangedEvent };
export declare const INSTRUCTION_TEXT = "Choose a file";
export declare const FILE_UPLOAD_SURFACE = "ww-file-upload-surface";
export declare const FILE_UPLOAD_SURFACE_INPUT = "ww-file-upload-surface__input";
export declare const FILE_UPLOAD_SURFACE_TEXT = "ww-file-upload-surface__text";
/**
 * FileUploadSurfaceAttrs
 */
export interface FileUploadSurfaceAttrs extends FileInputAttrs {
}
/**
 * FileUploadSurface provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
export declare class FileUploadSurface extends AbstractControl<File, FileUploadSurfaceAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        stop: (e: Event) => void;
        drop: (e: DragEvent) => void;
        input: {
            className: string;
            name: string;
            accept: string;
            multiple: true | undefined;
            onChange: (e: FileChangedEvent) => void;
        };
        text: {
            className: string;
            value: string;
        };
    };
}
