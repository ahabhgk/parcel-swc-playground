import {useColorModeValue} from '@chakra-ui/react';
import {editor} from 'monaco-editor';

export const sharedEditorOptions: editor.IStandaloneEditorConstructionOptions =
  {
    fontFamily:
      '"Cascadia Code", "Jetbrains Mono", "Fira Code", "Menlo", "Consolas", monospace',
    fontLigatures: true,
    fontSize: 14,
    lineHeight: 24,
    minimap: {enabled: false},
    tabSize: 2,
  };

export function useEditorTheme() {
  return useColorModeValue('light', 'vs-dark');
}
