import './text-editor.css';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';

import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = function ({ cell }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);

  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        editorRef.current &&
        e.target &&
        editorRef.current.contains(e.target as Node)
      ) {
        e.stopPropagation();
      } else setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={editorRef}>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      </div>
    );
  }

  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
