import Editor from '@monaco-editor/react';
import {Box, Flex, Heading} from '@chakra-ui/react';
import {sharedEditorOptions, useEditorTheme} from '../helpers/editor';
import {TransformResult} from '../helpers/transformer';

const editorOptions = {
  ...sharedEditorOptions,
  readOnly: true,
};

interface Prop {
  result: Omit<TransformResult, 'code'> | undefined;
}

export default function ResultEditor({result}: Prop) {
  const monacoTheme = useEditorTheme();

  const output = JSON.stringify(result, null, 2);

  return (
    <Flex direction="column" minW={0} minH={0}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mb="8px">
          Result
        </Heading>
      </Flex>
      <Box height="full" borderWidth="1px">
        <Editor
          value={output}
          language="json"
          defaultLanguage="json"
          theme={monacoTheme}
          options={editorOptions}
        />
      </Box>
    </Flex>
  );
}
