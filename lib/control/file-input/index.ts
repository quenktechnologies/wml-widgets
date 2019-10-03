import { View } from '@quenk/wml';
import { concat } from '../../util';
import { getClassName, getId } from '../../';
import { ControlAttrs, AbstractControl, Event as CEvent, getName } from '../';
import { FileInputView } from './wml/file-input';

///classNames:begin
export const FILE_INPUT = 'ww-file-input';
///classNames:end

/**
 * FileInputAttrs
 */
export interface FileInputAttrs extends ControlAttrs<File> {

    /**
     * accept specifies the type of files that should be recommended by
     * the file uploader dialog.
     */
    accept?: string,

    /**
     * text displayed as instructions to the user.
     */
    text?: string,

    /**
     * mulitple input flag.
     */
    multiple?: boolean,

    /**
     * onChange handler
     */
    onChange?: (e: FileChangedEvent) => void

}

/**
 * FileChangedEvent is fired when
 */
export class FileChangedEvent extends CEvent<File[]> { }

/**
 * FileInput provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
export class FileInput
    extends
    AbstractControl<File, FileInputAttrs> {

    view: View = new FileInputView(this);

    values = {

        id: getId(this.attrs),

        className: concat(FILE_INPUT, getClassName(this.attrs)),

        name: getName(this.attrs),

        accept: (this.attrs.ww && this.attrs.ww.accept) ?
            this.attrs.ww.accept : '',

        multiple: (this.attrs.ww && this.attrs.ww.multiple) ?
            this.attrs.ww.multiple : undefined,

        change: (e: Event) => {

            let input = <HTMLInputElement>e.target;

            if ((input.files != null) &&
                (input.files.length > 0) &&
                this.attrs.ww &&
                this.attrs.ww.onChange) {

                this.attrs.ww.onChange
                    (new FileChangedEvent(input.name, list2Array(input.files)));

            }

        }

    }

}

/**
 * list2Array converts a FileList into a plain array of files.
 */
export const list2Array = (list: FileList): File[] => {

    let ret = [];

    for (let i = 0; i < list.length; i++)
        ret[i] = list[i];

    return ret;

}
