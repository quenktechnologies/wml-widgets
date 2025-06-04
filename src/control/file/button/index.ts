import { View } from '@quenk/wml';

import { getClassName, getId } from '../../../';
import { AbstractControl, getName } from '../../';
import { FileButtonView } from './views/button';
import {
    dispatchFileChangedEvent,
    FileChangedEvent,
    FileControlAttrs
} from '..';
import { concat } from '../../../util';
import { ERROR, OUTLINE } from '../../../content/style';

export { FileChangedEvent };

/**
 * FileButtonAttrs
 */
export interface FileButtonAttrs extends FileControlAttrs {
    /**
     * buttonClassName to apply to the button.
     */
    buttonClassName?: string;

    /**
     * text displayed as instructions to the user.
     */
    text?: string;

    /**
     * error message to display when a file is populated
     */
    error?: string;

    /**
     * disabled if true will render the button disabled.
     */
    disabled?: boolean;
}

/**
 * FileButton provides a surface for file selection.
 *
 * It supports drag and drop of the files as input.
 */
export class FileButton extends AbstractControl<File, FileButtonAttrs> {
    view: View = new FileButtonView(this);

    id = getId(this.attrs);

    className = getClassName(this.attrs, 'ww-file-button');

    error = this.attrs.error;

    isBusy = false;

    name = getName(this.attrs);

    value = this.attrs.value;

    input = {
        accept: this.attrs && this.attrs.accept ? this.attrs.accept : '',

        onchange: () => {
            let minput = this.view.findById<
                HTMLInputElement & { files: FileList }
            >('input');
            if (minput.isJust()) {
                this.dispatchChange(minput.get());
            }
        }
    };

    preview = {
        onDelete: () => {
            this.dispatchChange();
        }
    };

    button = {
        className: () =>
            concat(
                'ww-file-button__button',
                this.error ? concat(ERROR, OUTLINE) : '',
                this.attrs.buttonClassName
            ),

        disabled: this.attrs.disabled,

        text: this.attrs.text ?? 'Browse',

        onClick: () => {
            let minput = this.view.findById<HTMLInputElement>('input');
            if (minput.isJust()) minput.get().click();
        }
    };

    dispatchChange(source: { files?: FileList } = {}) {
        dispatchFileChangedEvent(this, source);
        this.error = '';
        this.view.invalidate();
    }

    /**
     * disable sets the disabled status of the button.
     */
    disable(state = true) {
        this.button.disabled = state;
        this.view.invalidate();
    }

    /**
     * busy sets the busy status for the file preview.
     */
    busy(state = true) {
        this.isBusy = state;
        this.view.invalidate();
    }
}
