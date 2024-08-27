import { createHeadlessEditor } from '@lexical/headless';
import * as jsdom from 'jsdom';
import { $generateHtmlFromNodes } from '@lexical/html';
import { logger } from '@/lib/logger';

const { JSDOM } = jsdom;

const editor = createHeadlessEditor({
  nodes: [],
  onError: () => {},
});

const dom = new JSDOM();
(global as any).window = dom.window;
(global as any).document = dom.window.document;
(global as any).navigator = {
  userAgent: 'node.js',
};

export const toHtml = async (json: string): Promise<string> => {
  try {
    editor.setEditorState(editor.parseEditorState(json));
    return await new Promise<string>((resolve, reject) => {
      editor.update(() => {
        try {
          const generatedHtml = $generateHtmlFromNodes(editor, null);
          resolve(generatedHtml);
        } catch (error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    logger.error(error);
    return '';
  }
};
