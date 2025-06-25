import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../contexts/ThemeContext';

interface User {
  id: number;
  name: string;
  color: string;
  cursor: { line: number; column: number };
}

interface MonacoEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  activeUsers: User[];
}

export default function MonacoEditor({ language, value, onChange, activeUsers }: MonacoEditorProps) {
  const { isDark } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Fira Code, monospace',
      lineNumbers: 'on',
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      automaticLayout: true,
    });

    // Add collaborative cursors (simulated)
    setTimeout(() => {
      activeUsers.forEach((user, index) => {
        const range = new monaco.Range(
          user.cursor.line,
          user.cursor.column,
          user.cursor.line,
          user.cursor.column + 1
        );

        const decoration = {
          range,
          options: {
            className: `cursor-${user.id}`,
            hoverMessage: { value: user.name },
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          }
        };

        editor.deltaDecorations([], [decoration]);
      });
    }, 1000);
  };

  return (
    <div className="h-full relative">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(val) => onChange(val || '')}
        onMount={handleEditorDidMount}
        theme={isDark ? 'vs-dark' : 'vs-light'}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
        }}
      />
      
      {/* User Cursors Overlay */}
      <style jsx>{`
        .cursor-1 {
          border-left: 2px solid #3B82F6;
          animation: blink 1s infinite;
        }
        .cursor-2 {
          border-left: 2px solid #10B981;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}