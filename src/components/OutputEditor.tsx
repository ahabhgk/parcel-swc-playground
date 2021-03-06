import {useEffect} from 'react';
import Editor, {useMonaco} from '@monaco-editor/react';
import {Box, Flex, Heading} from '@chakra-ui/react';
import {sharedEditorOptions, useEditorTheme} from '../helpers/editor';

const editorOptions = {
  ...sharedEditorOptions,
  readOnly: true,
};

interface Prop {
  code: string | undefined;
}

export default function OutputEditor({code}: Prop) {
  const monaco = useMonaco();
  const monacoTheme = useEditorTheme();

  useEffect(() => {
    monaco?.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSyntaxValidation: true,
      noSemanticValidation: true,
      noSuggestionDiagnostics: true,
    });
  }, [monaco]);

  return (
    <Flex direction="column" minW={0} minH={0}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mb="8px">
          Output
        </Heading>
      </Flex>
      <Box height="full" borderWidth="1px">
        <Editor
          value={code}
          language="javascript"
          defaultLanguage="javascript"
          theme={monacoTheme}
          options={editorOptions}
        />
      </Box>
    </Flex>
  );
}
