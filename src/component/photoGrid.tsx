import { useEffect, useState, type CSSProperties } from "react";
import { UnauthorizedError } from "../services/authService";
import { photoService, type PhotoItem } from "../services/photoService";

const gridCSS: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '0.5rem',
    border: '2px solid',
    margin: '2%',
    paddingLeft: '1%',
    paddingRight: '1%'
}

const itemCSS: CSSProperties = {
    display: 'flex',
    width: 120,
    height: 120,
    minWidth: 100,
}

const internalElements: CSSProperties = {
    display: 'flex',
    width: '100%',
    height: '100%',
    border: '2px solid',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
}

export default function PhotoGrid({ totalItems, gridType, onUnauthorized }: { totalItems: {}[]; gridType: string; onUnauthorized: () => void }) {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadPhotos = async () => {
            try {
                const fetchedPhotos = await photoService.getPhotosForGrid(gridType);
                if (isMounted) {
                    setPhotos(fetchedPhotos);
                }
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    onUnauthorized();
                    return;
                }

                if (isMounted) {
                    setPhotos([]);
                }
            }
        };

        void loadPhotos();

        return () => {
            isMounted = false;
        };
    }, [gridType, onUnauthorized]);

    const fallbackItems = totalItems.length;
    const itemCount = photos.length > 0 ? photos.length : fallbackItems;

    return (
        <div style={gridCSS}>
            {Array.from({ length: itemCount }, (_, i) => {
                const photo = photos[i];

                return (
                    <div style={itemCSS} key={photo?.id ?? `item-${i}`}>
                        {photo?.imageUrl ? (
                            <img src={photo.imageUrl} alt="album" style={internalElements} />
                        ) : (
                            <div style={internalElements}>Photo {i + 1}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
