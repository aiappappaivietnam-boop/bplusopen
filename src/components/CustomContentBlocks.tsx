import React, { useState, type ChangeEvent } from 'react';
import { ImagePlus, Pencil, Plus, Trash2 } from 'lucide-react';
import { useCatalogData, type CustomContentBlock } from '../context/CatalogDataContext';
import { useLanguage } from '../context/LanguageContext';

const MAX_FILE_BYTES = 3 * 1024 * 1024;

export const CustomContentBlocks: React.FC<{ pageKey: string }> = ({ pageKey }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';
  const {
    edits, isAdminAuthenticated, isEditMode,
    addContentBlock, updateContentBlock, removeContentBlock,
  } = useCatalogData();
  const [type, setType] = useState<CustomContentBlock['type'] | null>(null);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const blocks = (edits.customBlocks || []).filter((block) => block.page === pageKey);

  const resetForm = () => {
    setType(null);
    setDraft('');
    setEditingId(null);
    setError('');
  };
  const chooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') || file.size > MAX_FILE_BYTES) {
      setError(isVi ? 'Chọn hình dưới 3 MB.' : 'Choose an image under 3 MB.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDraft(reader.result);
        setError('');
      }
    };
    reader.onerror = () => setError(isVi ? 'Không đọc được hình.' : 'Could not read this image.');
    reader.readAsDataURL(file);
  };
  const save = () => {
    const value = draft.trim();
    if (!type || !value) {
      setError(isVi ? 'Nhập nội dung trước khi lưu.' : 'Add content before saving.');
      return;
    }
    if (editingId) updateContentBlock(editingId, value);
    else if (!addContentBlock({ id: `block-${crypto.randomUUID()}`, page: pageKey, type, value })) {
      setError(isVi ? 'Không lưu được. Kiểm tra dung lượng trình duyệt.' : 'Could not save. Check browser storage.');
      return;
    }
    resetForm();
  };

  if (!blocks.length && (!isAdminAuthenticated || !isEditMode)) return null;

  return (
    <section data-custom-content className="border-t border-[#DED9CD] bg-[#FAF8F5] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-5">
        {blocks.map((block) => (
          <div key={block.id} className="group relative rounded-xs border border-[#DED9CD] bg-white p-4 shadow-sm sm:p-6">
            {block.type === 'text'
              ? <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1C1A17] sm:text-base">{block.value}</p>
              : <img src={block.value} alt={isVi ? 'Hình ảnh bổ sung' : 'Additional image'} className="max-h-[640px] w-full object-contain" />}
            {isAdminAuthenticated && isEditMode && (
              <div data-admin-ui className="mt-3 flex gap-2">
                <button type="button" onClick={() => { setType(block.type); setDraft(block.value); setEditingId(block.id); setError(''); }} className="inline-flex items-center gap-1 rounded-xs border px-3 py-2 text-xs text-[#1C1A17]">
                  <Pencil className="h-3.5 w-3.5" />{isVi ? 'Sửa' : 'Edit'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(isVi ? 'Xóa nội dung này khỏi trang?' : 'Remove this content from the page?')) removeContentBlock(block.id);
                  }}
                  className="inline-flex items-center gap-1 rounded-xs border border-red-300 px-3 py-2 text-xs text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />{isVi ? 'Xóa' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        ))}
        {isAdminAuthenticated && isEditMode && (
          <div data-admin-ui className="rounded-xs border border-dashed border-[#C7A58F] bg-white p-4">
            {!type ? (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setType('text')} className="inline-flex items-center gap-2 rounded-xs bg-[#1C1A17] px-4 py-2.5 text-xs font-semibold text-white">
                  <Plus className="h-4 w-4" />{isVi ? 'Thêm văn bản' : 'Add text'}
                </button>
                <button type="button" onClick={() => setType('image')} className="inline-flex items-center gap-2 rounded-xs bg-[#1C1A17] px-4 py-2.5 text-xs font-semibold text-white">
                  <ImagePlus className="h-4 w-4" />{isVi ? 'Thêm hình ảnh' : 'Add image'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {type === 'text'
                  ? <textarea aria-label={isVi ? 'Nội dung mới' : 'New content'} value={draft} onChange={(event) => setDraft(event.target.value)} rows={5} className="w-full rounded-xs border border-[#DED9CD] p-3 text-sm text-[#1C1A17]" />
                  : <>
                      <input aria-label={isVi ? 'Đường dẫn hình ảnh' : 'Image URL'} value={draft.startsWith('data:') ? '' : draft} onChange={(event) => setDraft(event.target.value)} placeholder="https://... or /image.jpg" className="w-full rounded-xs border border-[#DED9CD] p-3 text-sm text-[#1C1A17]" />
                      <label className="block w-fit cursor-pointer rounded-xs border border-[#C7A58F] px-4 py-2 text-xs font-semibold text-[#1C1A17]">
                        {isVi ? 'Chọn hình từ máy (dưới 3 MB)' : 'Choose image from device (under 3 MB)'}
                        <input type="file" accept="image/*" onChange={chooseFile} className="hidden" />
                      </label>
                      {draft && <img src={draft} alt="" className="max-h-40 object-contain" />}
                    </>}
                {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
                <div className="flex gap-2">
                  <button type="button" onClick={save} className="rounded-xs bg-[#287A3D] px-4 py-2 text-xs font-bold text-white">{isVi ? 'Lưu' : 'Save'}</button>
                  <button type="button" onClick={resetForm} className="rounded-xs border px-4 py-2 text-xs text-[#1C1A17]">{isVi ? 'Hủy' : 'Cancel'}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
