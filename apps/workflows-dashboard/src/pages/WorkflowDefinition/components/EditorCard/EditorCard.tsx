import { Button } from '@/components/atoms/Button';
import { Card, CardContent, CardHeader } from '@/components/atoms/Card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/atoms/Dialog';
import { JSONEditorComponent } from '@/components/organisms/JsonEditor';
import { Pencil } from 'lucide-react';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';

interface IEditorCardProps {
  value: object;
  title: string;
  onChange?: (value: object) => void;
  onSave?: (value: object) => void;
}

export const EditorCard: FunctionComponent<IEditorCardProps> = ({
  value,
  title,
  onChange,
  onSave,
}) => {
  const [valueSnapshot, setSnapshot] = useState(value);
  const [internalValue, setInternalValue] = useState(valueSnapshot);

  const hasChanges = useMemo(() => {
    return JSON.stringify(internalValue) !== JSON.stringify(valueSnapshot);
  }, [internalValue, valueSnapshot]);

  const handleChange = useCallback(
    (value: object) => {
      setInternalValue(value);
      onChange && onChange(value);
    },
    [onChange],
  );

  const handleSave = useCallback(() => {
    setSnapshot(internalValue);
    onSave && onSave(internalValue);
  }, [internalValue, onSave]);

  return (
    <Dialog
      onOpenChange={open => {
        if (!open) {
          setSnapshot(value);
          setInternalValue(value);
        }
      }}
    >
      <Card className="flex h-[400px] h-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <span>{title}</span>
          <span>
            <DialogTrigger asChild>
              <Pencil />
            </DialogTrigger>
          </span>
        </CardHeader>
        <CardContent className="flex-1">
          <JSONEditorComponent readOnly value={value} />
        </CardContent>
      </Card>
      <DialogContent className="h-[80vh] min-w-[80vw] overflow-hidden pt-12">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <JSONEditorComponent value={internalValue} onChange={handleChange} />
          </div>
          {hasChanges && onSave && (
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
