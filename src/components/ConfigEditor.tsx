import {useEffect, useRef} from 'react';
import type {editor} from 'monaco-editor';
import Editor, {OnChange, useMonaco} from '@monaco-editor/react';
import {Box, Flex, Heading} from '@chakra-ui/react';
import {sharedEditorOptions, useEditorTheme} from '../helpers/editor';

interface Props {
  config: string;
  onChange: OnChange;
}

export default function OutputEditor({config, onChange}: Props) {
  const monaco = useMonaco();
  const monacoTheme = useEditorTheme();

  useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: false,
    });
  }, [monaco]);

  console.log(config);

  return (
    <Flex direction="column" minW={0} minH={0}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md" mb="8px">
          Config
        </Heading>
      </Flex>
      <Box height="full" borderWidth="1px">
        <Editor
          value={config}
          language="json"
          defaultLanguage="json"
          theme={monacoTheme}
          options={sharedEditorOptions}
          onChange={onChange}
        />
      </Box>
    </Flex>
  );
}
