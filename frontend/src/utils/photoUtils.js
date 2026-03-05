export const buildPhotoUrl = (filename, type) => {
    const base = import.meta.env.VITE_API_BASE || "";

    if (!filename) {
        return null;
    }

    return `${base}/uploads/${type}/${filename}`;
};