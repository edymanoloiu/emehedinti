import publication from '../data/publication';
import { slugify } from './index';

/**
 * Legacy / variant slugs for the main local news category.
 * Posts historically used several cate spellings (incl. U+2011 non-breaking hyphen),
 * while nav uses publication.categorySlug ("azi-in-drobeta").
 */
const LOCAL_CATEGORY_SLUG_ALIASES = [
	'azi-in-drobeta',
	'azi-in-drobeta-turnu-severin',
	'azi-in-drobetaturnu-severin', // slugify bug before unicode-dash normalization
];

export function getLocalCategorySlug() {
	return publication.categorySlug || 'azi-in-drobeta';
}

export function getLocalCategorySlugSet() {
	const set = new Set(LOCAL_CATEGORY_SLUG_ALIASES);
	set.add(getLocalCategorySlug());
	if (publication.localCate) {
		set.add(slugify(publication.localCate));
	}
	return set;
}

export function isLocalCategorySlug(slug) {
	return getLocalCategorySlugSet().has(String(slug || ''));
}

export function isLocalCategoryName(cate) {
	if (!cate) return false;
	return isLocalCategorySlug(slugify(cate));
}

/** Canonical public slug for a post's cate (collapses local variants). */
export function getCanonicalCategorySlug(cate) {
	if (!cate) return getLocalCategorySlug();
	const raw = slugify(cate);
	return isLocalCategorySlug(raw) ? getLocalCategorySlug() : raw;
}

export function postMatchesCategorySlug(cate, requestedSlug) {
	if (!cate || !requestedSlug) return false;
	const postSlug = slugify(cate);
	if (postSlug === requestedSlug) return true;
	const local = getLocalCategorySlugSet();
	return local.has(requestedSlug) && local.has(postSlug);
}
