import { View, WMLElement } from '@quenk/wml';

import { ControlAttrs, Event, Name } from '../';

/**
 * FileControlAttrs
 */
export interface FileControlAttrs extends ControlAttrs<File | undefined> {
    /**
     * accept specifies the type of files that should be recommended by
     * the file uploader dialog.
     */
    accept?: string;

    /**
     * mulitple if true, allows for more than one file to be selected/dropped.
     *
     * This may not be honoured by all controls.
     */
    multiple?: boolean;

    /**
     * onChange handler
     */
    onChange?: (e: FileChangedEvent) => void;

    /**
     * onChangeDone is an internal handler used for detecting the end of the file
     * changes.
     */
    onChangeDone?: () => void;
}

/**
 * FileChangedEvent is fired when the selected file has changed.
 *
 * Note the value will be undefined if the file has been unselected.
 */
export class FileChangedEvent extends Event<File | undefined> {
    /**
     * @param name    - Control name.
     * @param value   - Control value.
     * @param index   - Index number of file (multiple only).
     * @param total   - Total number of files uploaded (multiple only).
     */
    constructor(
        public name: Name,
        public value: File | undefined = undefined,
        public index = 1,
        public total = 1
    ) {
        super(name, value);
    }
}

/**
 * dispatchFileChangedEvent is a helper used by the single fire file controls.
 * @internal
 */
export const dispatchFileChangedEvent = (
    control: { attrs: FileControlAttrs; value: File | undefined },
    source: { files?: FileList | null }
) => {
    if (!source.files || source.files.length === 0) {
        control.value = undefined;
        control.attrs?.onChange?.(
            new FileChangedEvent(control.attrs.name ?? '', control.value)
        );
    } else {
        for (let i = 0; i < source.files.length; i++) {
            control.value = source.files[i];
            control.attrs?.onChange?.(
                new FileChangedEvent(control.attrs.name ?? '', control.value)
            );
            if (!control.attrs.multiple && i == 0) break;
        }
        control.attrs.onChangeDone?.();
    }
};

/**
 * setBusy calls the busy method for a widget.
 * @internal
 */
export const setBusy = (view: View, id: string, state = true) => {
    let mwidget = view.findById<
        WMLElement & { busy: (state: boolean) => void }
    >(id);
    if (mwidget.isJust()) {
        mwidget.get().busy(state);
    }
};
