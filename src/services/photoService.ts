import { apiFetch } from "./apiClient";

export type PhotoItem = {
    id: string;
    imageUrl?: string;
};

const placeholderPhotos = (prefix: string, count: number): PhotoItem[] =>
    Array.from({ length: count }, (_, index) => ({ id: `${prefix}-${index}` }));

async function getAllPhotos(): Promise<PhotoItem[]> {
    const photosRes = await apiFetch("/photos");

    if (!photosRes.ok) {
        return [];
    }

    const { photos } = await photosRes.json();

    if (!Array.isArray(photos)) {
        return [];
    }

    return Promise.all(
        photos.map(async (photo: { id: string }) => {
            const imageRes = await apiFetch(`/photos/${photo.id}/file`);

            if (!imageRes.ok) {
                return { ...photo };
            }

            return {
                ...photo,
                imageUrl: URL.createObjectURL(await imageRes.blob()),
            };
        }),
    );
}

export const photoService = {
    getPhotosForGrid(gridType: string) {
        switch (gridType) {
            case "all-images":
                return getAllPhotos();
            case "favourites":
                return Promise.resolve(placeholderPhotos("fav", 4));
            case "my-albums":
                return Promise.resolve(placeholderPhotos("album", 5));
            case "trash":
                return Promise.resolve(placeholderPhotos("trash", 2));
            default:
                return Promise.resolve([]);
        }
    },
};
