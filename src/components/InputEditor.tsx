import {useEffect, useRef} from 'react';
import type {editor} from 'monaco-editor';
import Editor, {OnChange, useMonaco} from '@monaco-editor/react';
import {Box, Flex, Heading} from '@chakra-ui/react';
import {sharedEditorOptions, useEditorTheme} from '../helpers/editor';

interface Props {
  code: string;
  onChange: OnChange;
}

export default function OutputEditor({code, onChange}: Props) {
  const monaco = useMonaco();
  const monacoTheme = useEditorTheme();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    monaco?.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSyntaxValidation: true,
      noSemanticValidation: true,
      noSuggestionDiagnostics: true,
    });
  }, [monaco]);

  const handleEditorDidMount = (instance: editor.IStandaloneCodeEditor) => {
    editorRef.current = instance;
  };

  return (
    <Flex direction="column" minW={0} minH={0}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mb="8px">
          Input
        </Heading>
      </Flex>
      <Box height="full" borderWidth="1px">
        <Editor
          value={code}
          language="typescript"
          defaultLanguage="typescript"
          theme={monacoTheme}
          options={sharedEditorOptions}
          onMount={handleEditorDidMount}
          onChange={onChange}
        />
      </Box>
    </Flex>
  );
}
