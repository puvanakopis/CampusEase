export const getPhotoUrl = (photo, type) => {
    const base = import.meta.env.VITE_API_BASE || "";

    if (!photo || !photo.filename) {
        return null;
    }

    const filename = encodeURIComponent(photo.filename);
    return `${base}/uploads/${type}/${filename}`;
};