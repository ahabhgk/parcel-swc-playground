import {useEffect} from 'react';
import Editor, {useMonaco} from '@monaco-editor/react';
import {Box, Flex, Heading} from '@chakra-ui/react';
import {sharedEditorOptions, useEditorTheme} from '../helpers/editor';
import {decode, TransformResult} from '../helpers/transformer';

const editorOptions = {
  ...sharedEditorOptions,
  readOnly: true,
};

interface Prop {
  result: TransformResult | undefined;
}

export default function OutputEditor({result}: Prop) {
  const monaco = useMonaco();
  const monacoTheme = useEditorTheme();

  useEffect(() => {
    monaco?.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSyntaxValidation: true,
      noSemanticValidation: true,
      noSuggestionDiagnostics: true,
    });
  }, [monaco]);

  const output =
    result?.diagnostics?.length ?? 0 > 0
      ? result?.diagnostics?.map(d => d.message).join('\n')
      : decode(result?.code);
  const editorLanguage =
    result?.diagnostics?.length ?? 0 > 0 ? 'text' : 'javascript';

  return (
    <Flex direction="column" gridArea="output" minW={0} minH={0}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mb="8px">
          Output
        </Heading>
      </Flex>
      <Box height="full" borderWidth="1px">
        <Editor
          value={output}
          language={editorLanguage}
          defaultLanguage="javascript"
          path="output.js"
          theme={monacoTheme}
          options={editorOptions}
        />
      </Box>
    </Flex>
  );
}
