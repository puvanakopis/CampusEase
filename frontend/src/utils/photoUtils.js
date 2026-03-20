export const buildPhotoUrl = (filename, type, first_name) => {
    const base = import.meta.env.VITE_API_BASE || "";

    if (!filename) {
        if (
            (type === "user_photo" || type === "owner_photo" || type === "admin_photo")
            && first_name
        ) {
            const initial = first_name.charAt(0).toUpperCase();
            return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff`;
        }
        return null;
    }

    return `${base}/uploads/${type}/${filename}`;
};