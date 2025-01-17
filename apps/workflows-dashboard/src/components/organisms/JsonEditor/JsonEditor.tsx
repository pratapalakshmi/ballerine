import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { FunctionComponent, useEffect, useRef } from 'react';

interface IJSONEditorProps {
  value: object;
  readOnly?: boolean;
  onChange?: (value: object) => void;
}

export const JSONEditorComponent: FunctionComponent<IJSONEditorProps> = ({
  value,
  readOnly,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (editorRef.current) return;

    editorRef.current = new JSONEditor(containerRef.current!, {
      onChange: () => {
        editorRef.current && onChange && onChange(editorRef.current.get());
      },
    });
  }, [containerRef, editorRef]);

  useEffect(() => {
    if (!editorRef.current) return;

    //TODO: Each set of value rerenders editor and loses focus, find workarounds
    editorRef.current.set(value);
  }, [editorRef]);

  useEffect(() => {
    if (!editorRef.current) return;

    editorRef.current.setMode(readOnly ? 'view' : 'code');
  }, [readOnly]);

  return <div className="h-full" ref={containerRef} />;
};
