import { View } from '@quenk/wml';
import { ControlAttrs, AbstractControl, Event as CEvent } from '../';
export declare const FILE_INPUT = "ww-file-input";
/**
 * FileInputAttrs
 */
export interface FileInputAttrs extends ControlAttrs<File> {
    /**
     * accept specifies the type of files that should be recommended by
     * the file uploader dialog.
     */
    accept?: string;
    /**
     * text displayed as instructions to the user.
     */
    text?: string;
    /**
     * mulitple input flag.
     */
    multiple?: boolean;
    /**
     * onChange handler
     */
    onChange?: (e: FileChangedEvent) => void;
}
/**
 * FileChangedEvent is fired when
 */
export declare class FileChangedEvent extends CEvent<File> {
}
/**
 * FileInput provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
export declare class FileInput extends AbstractControl<File, FileInputAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        name: string;
        accept: string;
        multiple: true | undefined;
        change: (e: Event) => void;
    };
}
