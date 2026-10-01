export type RalColor = {
  id: string;
  code: string;
  name: string;
  nameVi: string;
  hex: string;
};

// RAL powder-coated steel palette supplied for the LUMA custom-finish option.
// The values match the eight uploaded color swatches used in the finish guide.
export const LUMA_RAL_COLORS: RalColor[] = [
  { id: 'ral-9004', code: 'RAL 9004', name: 'Signal black', nameVi: 'Đen tín hiệu', hex: '#303133' },
  { id: 'ral-1034', code: 'RAL 1034', name: 'Pastel yellow', nameVi: 'Vàng pastel', hex: '#D9A156' },
  { id: 'ral-3003', code: 'RAL 3003', name: 'Ruby red', nameVi: 'Đỏ ruby', hex: '#7D0D25' },
  { id: 'ral-7036', code: 'RAL 7036', name: 'Platinum grey', nameVi: 'Xám platinum', hex: '#949293' },
  { id: 'ral-1027', code: 'RAL 1027', name: 'Fern green', nameVi: 'Xanh dương xỉ', hex: '#5E703E' },
  { id: 'ral-2009', code: 'RAL 2009', name: 'Traffic orange', nameVi: 'Cam giao thông', hex: '#C25500' },
  { id: 'ral-5003', code: 'RAL 5003', name: 'Sapphire blue', nameVi: 'Xanh sapphire', hex: '#233253' },
  { id: 'ral-9003', code: 'RAL 9003', name: 'Signal white', nameVi: 'Trắng tín hiệu', hex: '#EBEBE9' },
];
