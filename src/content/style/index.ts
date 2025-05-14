///classNames:begin
/**
 * DEFAULT style.
 */
export const DEFAULT = '-default';

/**
 * PRIMARY style.
 */
export const PRIMARY = '-primary';

/**
 * SUCCESS style.
 */
export const SUCCESS = '-success';

/**
 * INFO style.
 */
export const INFO = '-info';

/**
 * WARNING style.
 */
export const WARNING = '-warning';

/**
 * ERROR style.
 */
export const ERROR = '-error';

/**
 * OUTLINE style.
 */
export const OUTLINE = '-outline';
///classNames:end

/**
 * Style enum.
 */
export enum Style {
    Default = 'default',

    Primary = 'primary',

    Success = 'success',

    Info = 'info',

    Warning = 'warning',

    Error = 'error'
}

export const styles: Style[] = [
    Style.Default,
    Style.Success,
    Style.Info,
    Style.Warning,
    Style.Error
];

/**
 * getStyleClassName
 */
export const getStyleClassName = (s: Style): string => {
    switch (s) {
        case Style.Default:
            return DEFAULT;

        case Style.Primary:
            return PRIMARY;

        case Style.Success:
            return SUCCESS;

        case Style.Info:
            return INFO;

        case Style.Warning:
            return WARNING;

        case Style.Error:
            return ERROR;
    }

    return DEFAULT;
};
