import React, { useEffect, useRef, useState } from 'react';
import { CatalogEdits, useCatalogData } from '../context/CatalogDataContext';
import { Collection, Product } from '../types';

type EditableRecord = 'collection' | 'product';
type EditableTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';

interface InlineEditableTextProps {
  record: EditableRecord;
  recordId: string;
  field: keyof Collection | keyof Product;
  value: string;
  as?: EditableTag;
  className?: string;
  multiline?: boolean;
  label?: string;
}

const mergeEdit = (
  edits: CatalogEdits,
  record: EditableRecord,
  recordId: string,
  field: string,
  value: string,
): CatalogEdits => {
  if (record === 'collection') {
    return {
      ...edits,
      collections: {
        ...edits.collections,
        [recordId]: {
          ...edits.collections[recordId],
          [field]: value,
        },
      },
    };
  }

  return {
    ...edits,
    products: {
      ...edits.products,
      [recordId]: {
        ...edits.products[recordId],
        [field]: value,
      },
    },
  };
};

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  record,
  recordId,
  field,
  value,
  as = 'span',
  className = '',
  multiline = false,
  label,
}) => {
  const { edits, isAdminAuthenticated, isEditMode, saveEdits } = useCatalogData();
  const elementRef = useRef<HTMLElement>(null);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = () => {
    const nextValue = (elementRef.current?.innerText || draft).trim();
    if (nextValue && nextValue !== value) {
      saveEdits(mergeEdit(edits, record, recordId, String(field), nextValue));
    }
  };

  if (!isAdminAuthenticated || !isEditMode) {
    return React.createElement(as, { className }, value);
  }

  return React.createElement(
    as,
    {
      ref: elementRef,
      contentEditable: true,
      suppressContentEditableWarning: true,
      role: 'textbox',
      'aria-label': label || `${String(field)} editor`,
      spellCheck: true,
      onInput: (event: React.FormEvent<HTMLElement>) => setDraft(event.currentTarget.innerText),
      onClick: (event: React.MouseEvent<HTMLElement>) => event.stopPropagation(),
      onBlur: commit,
      onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.blur();
        }
      },
      className: `${className} ${multiline ? 'whitespace-pre-wrap' : ''} rounded-xs outline-none ring-1 ring-dashed ring-[#C28B75]/70 ring-offset-2 transition-shadow focus:ring-2 focus:ring-[#9B522E]`,
      title: 'Click to edit. Changes save when you leave the field.',
    },
    draft,
  );
};
