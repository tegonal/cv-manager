import path from 'path';

export const getFileInTemplateMedia = (file: string) => {
  return path.resolve(__dirname, '../../../../templates/media', file);
};
