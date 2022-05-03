import {useEffect, useRef} from 'react';
import type {editor} from 'monaco-editor';
import Editor, {OnChange, useMonaco} from '@monaco-editor/react';
import {Box, Flex, Heading} from '@chakra-ui/react';
import {TransformConfig} from '../helpers/transformer';
import {sharedEditorOptions, useEditorTheme} from '../helpers/editor';

interface Props {
  code: string | undefined;
  onChange: OnChange;
  config: Omit<TransformConfig, 'code'>;
}

export default function InputEditor({code, config, onChange}: Props) {
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

  const language = config.is_type_script ? 'typescript' : 'javascript';

  return (
    <Flex direction="column" gridArea="input" minW={0} minH={0}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mb="8px">
          Input
        </Heading>
      </Flex>
      <Box width="full" height="full" borderWidth="1px">
        <Editor
          value={code}
          language={language}
          defaultLanguage={language}
          theme={monacoTheme}
          options={sharedEditorOptions}
          onMount={handleEditorDidMount}
          onChange={onChange}
        />
      </Box>
    </Flex>
  );
}
