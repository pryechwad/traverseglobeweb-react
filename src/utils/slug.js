export function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .trim()
    // replace & with 'and'
    .replace(/&/g, ' and ')
    // remove apostrophes
    .replace(/["'’`]/g, '')
    // replace non-alphanumeric with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // collapse hyphens
    .replace(/-+/g, '-')
    // trim hyphens
    .replace(/^-|-$/g, '');
}
