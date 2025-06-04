import * as views from './wml/file-uploader';

import { FileButtonPage } from '../control_file-button';

export class FileUploaderPage extends FileButtonPage {
    view = new views.Main(this);
}

export default new FileUploaderPage();
