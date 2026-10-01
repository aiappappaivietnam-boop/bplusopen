import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { COLLECTIONS, PRODUCTS } from '../data/furnitureData';
import { Collection, Product } from '../types';

const EDITS_STORAGE_KEY = 'b-open-catalog-edits-v1';
const ADMIN_SESSION_KEY = 'b-open-admin-session-v1';

export type CustomContentBlock = {
  id: string;
  page: string;
  type: 'text' | 'image';
  value: string;
};

export type CatalogEdits = {
  collections: Record<string, Partial<Collection>>;
  products: Record<string, Partial<Product>>;
  addedProducts: Product[];
  images: Record<string, string>;
  hiddenImages: string[];
  content: Record<string, string>;
  deletedProductIds: string[];
  hiddenHomeCollectionIds: string[];
  customBlocks: CustomContentBlock[];
};

type CatalogDataContextValue = {
  collections: Collection[];
  products: Product[];
  edits: CatalogEdits;
  revision: number;
  isAdminAuthenticated: boolean;
  isEditMode: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setEditMode: (enabled: boolean) => void;
  saveEdits: (nextEdits: CatalogEdits) => void;
  addProduct: (product: Product) => boolean;
  saveImageEdit: (originalSrc: string, replacementSrc: string) => void;
  removeImageEdit: (originalSrc: string) => void;
  hideImage: (originalSrc: string) => void;
  restoreImage: (originalSrc: string) => void;
  saveContentEdit: (contentKey: string, replacementText: string) => void;
  saveContentEdits: (patch: Record<string, string>) => void;
  removeContentEdit: (contentKey: string) => void;
  deleteProduct: (id: string) => void;
  restoreProduct: (id: string) => void;
  hideHomeCollection: (id: string) => void;
  restoreHomeCollection: (id: string) => void;
  addContentBlock: (block: CustomContentBlock) => boolean;
  updateContentBlock: (id: string, value: string) => void;
  removeContentBlock: (id: string) => void;
  resetEdits: () => void;
};

const CatalogDataContext = createContext<CatalogDataContextValue | undefined>(undefined);

const EMPTY_EDITS: CatalogEdits = {
  collections: {},
  products: {},
  addedProducts: [],
  images: {},
  hiddenImages: [],
  content: {},
  deletedProductIds: [],
  hiddenHomeCollectionIds: [],
  customBlocks: [],
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const BASE_COLLECTIONS = clone(COLLECTIONS);
const BASE_PRODUCTS = clone(PRODUCTS);

const readStoredEdits = (): CatalogEdits => {
  if (typeof window === 'undefined') return clone(EMPTY_EDITS);

  try {
    const raw = window.localStorage.getItem(EDITS_STORAGE_KEY);
    if (!raw) return clone(EMPTY_EDITS);
    const parsed = JSON.parse(raw) as Partial<CatalogEdits>;
    return {
      collections: parsed.collections && typeof parsed.collections === 'object' ? parsed.collections : {},
      products: parsed.products && typeof parsed.products === 'object' ? parsed.products : {},
      addedProducts: Array.isArray(parsed.addedProducts)
        ? parsed.addedProducts.filter((product): product is Product =>
            typeof product?.id === 'string' &&
            typeof product?.name === 'string' &&
            typeof product?.collection === 'string' &&
            typeof product?.imageUrl === 'string' &&
            typeof product?.dimensions?.width === 'string')
        : [],
      images: parsed.images && typeof parsed.images === 'object' ? parsed.images : {},
      hiddenImages: Array.isArray(parsed.hiddenImages)
        ? parsed.hiddenImages.filter((src): src is string => typeof src === 'string')
        : [],
      content: parsed.content && typeof parsed.content === 'object' ? parsed.content : {},
      deletedProductIds: Array.isArray(parsed.deletedProductIds)
        ? parsed.deletedProductIds.filter((id): id is string => typeof id === 'string')
        : [],
      hiddenHomeCollectionIds: Array.isArray(parsed.hiddenHomeCollectionIds)
        ? parsed.hiddenHomeCollectionIds.filter((id): id is string => typeof id === 'string')
        : [],
      customBlocks: Array.isArray(parsed.customBlocks)
        ? parsed.customBlocks.filter((block): block is CustomContentBlock =>
            typeof block?.id === 'string' &&
            typeof block?.page === 'string' &&
            (block?.type === 'text' || block?.type === 'image') &&
            typeof block?.value === 'string')
        : [],
    };
  } catch {
    return clone(EMPTY_EDITS);
  }
};

const applyEditsToCatalog = (edits: CatalogEdits) => {
  // Restore the source data first so reset and edits from another tab are deterministic.
  COLLECTIONS.splice(0, COLLECTIONS.length, ...clone(BASE_COLLECTIONS));
  PRODUCTS.splice(0, PRODUCTS.length, ...clone(BASE_PRODUCTS), ...clone(edits.addedProducts || []));

  Object.entries(edits.collections).forEach(([id, patch]) => {
    const collection = COLLECTIONS.find((item) => item.id === id);
    if (collection) Object.assign(collection, clone(patch));
  });

  Object.entries(edits.products).forEach(([id, patch]) => {
    const product = PRODUCTS.find((item) => item.id === id);
    if (product) Object.assign(product, clone(patch));
  });
  const deleted = new Set(edits.deletedProductIds || []);
  PRODUCTS.splice(0, PRODUCTS.length, ...PRODUCTS.filter((product) => !deleted.has(product.id)));
};

const buildEffectiveCatalog = (edits: CatalogEdits) => {
  const collections = clone(BASE_COLLECTIONS);
  const products = [...clone(BASE_PRODUCTS), ...clone(edits.addedProducts || [])];

  Object.entries(edits.collections).forEach(([id, patch]) => {
    const collection = collections.find((item) => item.id === id);
    if (collection) Object.assign(collection, clone(patch));
  });

  Object.entries(edits.products).forEach(([id, patch]) => {
    const product = products.find((item) => item.id === id);
    if (product) Object.assign(product, clone(patch));
  });

  const deleted = new Set(edits.deletedProductIds || []);
  return { collections, products: products.filter((product) => !deleted.has(product.id)) };
};

const readAdminSession = () => {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
};

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'bopen2026';

export const CatalogDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [edits, setEdits] = useState<CatalogEdits>(() => {
    const stored = readStoredEdits();
    applyEditsToCatalog(stored);
    return stored;
  });
  const [revision, setRevision] = useState(0);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(readAdminSession);
  const [isEditMode, setIsEditModeState] = useState(readAdminSession);
  const { collections, products } = useMemo(() => buildEffectiveCatalog(edits), [edits]);

  const setEditMode = useCallback((enabled: boolean) => {
    setIsEditModeState(enabled);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const isValid = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    if (!isValid) return false;

    try {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
    } catch {
      // The in-memory session remains available if browser storage is disabled.
    }
    setIsEditModeState(true);
    setIsAdminAuthenticated(true);
    return true;
  }, []);

  const logout = useCallback(() => {
    try {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignore storage failures; the React state still logs the user out.
    }
    setIsEditModeState(false);
    setIsAdminAuthenticated(false);
  }, []);

  const saveEdits = useCallback((nextEdits: CatalogEdits) => {
    const normalized = clone(nextEdits);
    applyEditsToCatalog(normalized);
    try {
      window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // The current session still reflects the saved values even if storage is unavailable.
    }
    setEdits(normalized);
    setRevision((current) => current + 1);
  }, []);

  const addProduct = useCallback((product: Product): boolean => {
    if (!isAdminAuthenticated || !isEditMode || !product.id.trim() ||
        BASE_PRODUCTS.some((item) => item.id === product.id) ||
        (edits.addedProducts || []).some((item) => item.id === product.id)) return false;
    const next = clone({
      ...edits,
      addedProducts: [...(edits.addedProducts || []), product],
    });
    try {
      window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      return false;
    }
    applyEditsToCatalog(next);
    setEdits(next);
    setRevision((value) => value + 1);
    return true;
  }, [edits, isAdminAuthenticated, isEditMode]);

  const saveImageEdit = useCallback((originalSrc: string, replacementSrc: string) => {
    const nextEdits: CatalogEdits = {
      ...edits,
      images: {
        ...edits.images,
        [originalSrc]: replacementSrc,
      },
    };
    saveEdits(nextEdits);
  }, [edits, saveEdits]);

  const removeImageEdit = useCallback((originalSrc: string) => {
    const nextImages = { ...edits.images };
    delete nextImages[originalSrc];
    saveEdits({ ...edits, images: nextImages });
  }, [edits, saveEdits]);

  const setImageHidden = useCallback((originalSrc: string, hidden: boolean) => {
    if (!isAdminAuthenticated || !isEditMode || !originalSrc) return;
    setEdits((current) => {
      const values = new Set(current.hiddenImages || []);
      if (hidden) values.add(originalSrc);
      else values.delete(originalSrc);
      const next = { ...current, hiddenImages: [...values] };
      try {
        window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the current session available.
      }
      setRevision((value) => value + 1);
      return next;
    });
  }, [isAdminAuthenticated, isEditMode]);
  const hideImage = useCallback((src: string) => setImageHidden(src, true), [setImageHidden]);
  const restoreImage = useCallback((src: string) => setImageHidden(src, false), [setImageHidden]);

  const saveContentEdits = useCallback((patch: Record<string, string>) => {
    setEdits((current) => {
      const next = {
        ...current,
        content: { ...current.content, ...patch },
      };
      try {
        window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // The current session still reflects the changes.
      }
      setRevision((value) => value + 1);
      return next;
    });
  }, []);

  const saveContentEdit = useCallback((contentKey: string, replacementText: string) => {
    saveContentEdits({ [contentKey]: replacementText });
  }, [saveContentEdits]);

  const removeContentEdit = useCallback((contentKey: string) => {
    setEdits((current) => {
      const nextContent = { ...current.content };
      delete nextContent[contentKey];
      const next = { ...current, content: nextContent };
      try {
        window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // The current session still reflects the changes.
      }
      setRevision((value) => value + 1);
      return next;
    });
  }, []);

  const updateDeletedProducts = useCallback((id: string, deleted: boolean) => {
    if (!BASE_PRODUCTS.some((product) => product.id === id) &&
        !(edits.addedProducts || []).some((product) => product.id === id)) return;
    setEdits((current) => {
      const ids = new Set(current.deletedProductIds || []);
      if (deleted) ids.add(id);
      else ids.delete(id);
      const next = { ...current, deletedProductIds: [...ids] };
      applyEditsToCatalog(next);
      try {
        window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the current session usable when storage is unavailable.
      }
      setRevision((value) => value + 1);
      return next;
    });
  }, [edits.addedProducts]);
  const deleteProduct = useCallback((id: string) => updateDeletedProducts(id, true), [updateDeletedProducts]);
  const restoreProduct = useCallback((id: string) => updateDeletedProducts(id, false), [updateDeletedProducts]);

  const updateHomeCollectionVisibility = useCallback((id: string, hidden: boolean) => {
    if (!isAdminAuthenticated || !isEditMode || !id.trim()) return;
    setEdits((current) => {
      const ids = new Set(current.hiddenHomeCollectionIds || []);
      if (hidden) ids.add(id);
      else ids.delete(id);
      const next = { ...current, hiddenHomeCollectionIds: [...ids] };
      try {
        window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Changes remain available in this session.
      }
      setRevision((value) => value + 1);
      return next;
    });
  }, [isAdminAuthenticated, isEditMode]);
  const hideHomeCollection = useCallback((id: string) => updateHomeCollectionVisibility(id, true), [updateHomeCollectionVisibility]);
  const restoreHomeCollection = useCallback((id: string) => updateHomeCollectionVisibility(id, false), [updateHomeCollectionVisibility]);

  const addContentBlock = useCallback((block: CustomContentBlock): boolean => {
    if (!isAdminAuthenticated || !isEditMode || !block.value.trim() ||
        (edits.customBlocks || []).some((item) => item.id === block.id)) return false;
    const next = { ...edits, customBlocks: [...(edits.customBlocks || []), block] };
    try {
      window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      return false;
    }
    setEdits(next);
    setRevision((value) => value + 1);
    return true;
  }, [edits, isAdminAuthenticated, isEditMode]);

  const updateContentBlock = useCallback((id: string, replacement: string) => {
    if (!isAdminAuthenticated || !isEditMode) return;
    setEdits((current) => {
      const next = {
        ...current,
        customBlocks: (current.customBlocks || []).map((block) =>
          block.id === id ? { ...block, value: replacement } : block),
      };
      try {
        window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the current session available.
      }
      setRevision((value) => value + 1);
      return next;
    });
  }, [isAdminAuthenticated, isEditMode]);

  const removeContentBlock = useCallback((id: string) => {
    if (!isAdminAuthenticated || !isEditMode) return;
    setEdits((current) => {
      const next = {
        ...current,
        customBlocks: (current.customBlocks || []).filter((block) => block.id !== id),
      };
      try {
        window.localStorage.setItem(EDITS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the current session available.
      }
      setRevision((value) => value + 1);
      return next;
    });
  }, [isAdminAuthenticated, isEditMode]);

  const resetEdits = useCallback(() => {
    const empty = clone(EMPTY_EDITS);
    applyEditsToCatalog(empty);
    try {
      window.localStorage.removeItem(EDITS_STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
    setEdits(empty);
    setRevision((current) => current + 1);
  }, []);

  const value = useMemo(
    () => ({
      collections,
      products,
      edits,
      revision,
      isAdminAuthenticated,
      isEditMode,
      login,
      logout,
      setEditMode,
      saveEdits,
      addProduct,
      saveImageEdit,
      removeImageEdit,
      hideImage,
      restoreImage,
      saveContentEdit,
      saveContentEdits,
      removeContentEdit,
      deleteProduct,
      restoreProduct,
      hideHomeCollection,
      restoreHomeCollection,
      addContentBlock,
      updateContentBlock,
      removeContentBlock,
      resetEdits,
    }),
    [collections, products, edits, revision, isAdminAuthenticated, isEditMode, login, logout, setEditMode, saveEdits, addProduct, saveImageEdit, removeImageEdit, hideImage, restoreImage, saveContentEdit, saveContentEdits, removeContentEdit, deleteProduct, restoreProduct, hideHomeCollection, restoreHomeCollection, addContentBlock, updateContentBlock, removeContentBlock, resetEdits],
  );

  return <CatalogDataContext.Provider value={value}>{children}</CatalogDataContext.Provider>;
};

export const useCatalogData = () => {
  const context = useContext(CatalogDataContext);
  if (!context) {
    throw new Error('useCatalogData must be used inside CatalogDataProvider');
  }
  return context;
};
