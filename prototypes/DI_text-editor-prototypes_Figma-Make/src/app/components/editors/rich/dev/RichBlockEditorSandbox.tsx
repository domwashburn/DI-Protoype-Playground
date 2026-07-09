import { useState } from 'react';
import { RichBlockEditor } from '../RichBlockEditor';

const SAMPLE_MARKDOWN = `# Underwriting notes

Type / to change a block. Select text across blocks to test Lexical range selection.

- Verify applicant income
- Review collateral score

> Quote blocks can already host normal Lexical child content; custom nested callouts arrive in Phase 2.
`;

export function RichBlockEditorSandbox() {
  const [markdown, setMarkdown] = useState('');

  return (
    <div>
      <RichBlockEditor
        initialContent={SAMPLE_MARKDOWN}
        onChange={(payload) => setMarkdown(payload.markdown)}
      />
      <pre aria-label="Serialized markdown preview">{markdown}</pre>
    </div>
  );
}
