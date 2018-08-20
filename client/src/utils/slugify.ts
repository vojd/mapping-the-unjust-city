export const slugify = (slug: string): string => {
  return slug
    .toLocaleLowerCase()
    .trim()
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ /g, '-')
    .replace(/[^\w_-]+/g, '');
};
