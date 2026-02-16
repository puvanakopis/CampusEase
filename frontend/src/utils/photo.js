export const getPhotoUrl = (photo) => {
    const base = import.meta.env.VITE_API_BASE;
    const defaultAvatar = "https://i.pravatar.cc/256";

    if (!photo || !photo.filename) return defaultAvatar;

    return `${base}/uploads/user_id/${photo.filename}`;
};
