import * as views from './wml/file-preview';

export class FilePreviewPage {
    view = new views.Main(this);

    file = new File([], 'test.csv');

    onDelete = () => confirm('Are you sure ? (nothing will happen)...');
}

export default new FilePreviewPage();
