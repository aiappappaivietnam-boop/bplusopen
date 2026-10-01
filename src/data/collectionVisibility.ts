/**
 * The collections currently published in the B+OPEN catalog.
 * Keep this list in one place so every catalog surface (home, search, menu,
 * admin and product results) shows the same four collections.
 */
export const VISIBLE_COLLECTION_IDS = ['luma', 'lumino', 'bloom', 'serenity'] as const;

export const isVisibleCollectionId = (id: string) =>
  (VISIBLE_COLLECTION_IDS as readonly string[]).includes(id.toLowerCase());
