export const slugify = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
};
export const isEventExpired = (eventDate) => {
    if (!eventDate) return false;
    const event = new Date(eventDate);
    const now = new Date();
    const diffTime = now - event;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 30;
};
