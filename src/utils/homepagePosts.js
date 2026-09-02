import { DateTime } from "luxon";
import { dedupePostsBySlug } from "../../lib/recomandarePosts";

export const SPOTLIGHT_HOME_LIMIT = 8;
export const HERO_HOME_COUNT = 5;
export const TOP_BAR_COUNT = 4;

const isEligible = (post) => post?.slug && (post.featureImg || post.thumb) && !post.isAd;

const parsePostDate = (post) => {
	if (!post?.date) return DateTime.fromMillis(0);
	const fromFormat = DateTime.fromFormat(String(post.date), "LLL dd yyyy");
	if (fromFormat.isValid) return fromFormat;
	const fromJs = DateTime.fromJSDate(new Date(post.date));
	return fromJs.isValid ? fromJs : DateTime.fromMillis(0);
};

export const comparePostsByDateDesc = (a, b) =>
	parsePostDate(b).toMillis() - parsePostDate(a).toMillis();

const LOCAL_TZ = "Europe/Bucharest";

const postDayStart = (post) => {
	const postDate = parsePostDate(post);
	if (!postDate.isValid) return null;
	return postDate.setZone(LOCAL_TZ).startOf("day");
};

export const isPostFromToday = (post) => {
	const day = postDayStart(post);
	if (!day) return false;
	const today = DateTime.now().setZone(LOCAL_TZ).startOf("day");
	return day.equals(today);
};

const isPostFromYesterday = (post) => {
	const day = postDayStart(post);
	if (!day) return false;
	const yesterday = DateTime.now().setZone(LOCAL_TZ).minus({ days: 1 }).startOf("day");
	return day.equals(yesterday);
};

const buildTodayThenYesterdayPool = (posts) => {
	const today = posts.filter(isPostFromToday);
	const yesterday = posts.filter(isPostFromYesterday);
	const seen = new Set();
	const combined = [];

	for (const post of [...today, ...yesterday]) {
		if (seen.has(post.slug)) continue;
		seen.add(post.slug);
		combined.push(post);
	}

	return combined;
};

const PROMO_HOME_DAYS = 2;

const isActivePromo = (post) => {
	if (!post?.isPromo) return false;
	const published = parsePostDate(post);
	if (!published.isValid) return false;
	const daysSince = Math.floor((Date.now() - published.toMillis()) / 86400000);
	return daysSince >= 0 && daysSince < PROMO_HOME_DAYS;
};

export const comparePostsForHomepage = (a, b) => {
	const promoA = isActivePromo(a) ? 1 : 0;
	const promoB = isActivePromo(b) ? 1 : 0;
	if (promoB !== promoA) return promoB - promoA;
	return comparePostsByDateDesc(a, b);
};

export const sortRssItemsByDateDesc = (items = []) =>
	[...items].sort((a, b) => {
		const dateA = new Date(a?.isoDate || a?.pubDate || 0).getTime();
		const dateB = new Date(b?.isoDate || b?.pubDate || 0).getTime();
		return dateB - dateA;
	});

const takeUnique = (posts, count, usedSlugs, priority = []) => {
	const taken = [];
	for (const post of priority) {
		if (taken.length >= count) break;
		if (!isEligible(post) || usedSlugs.has(post.slug)) continue;
		taken.push(post);
		usedSlugs.add(post.slug);
	}
	for (const post of posts) {
		if (taken.length >= count) break;
		if (!isEligible(post) || usedSlugs.has(post.slug)) continue;
		taken.push(post);
		usedSlugs.add(post.slug);
	}
	return taken;
};

const LOCAL_CATES = [
	"Justitie, Procese si Litigii",
	"Fiscalitate si Finante Personale",
	"Ghiduri Administrative si Birocratie",
	"Drepturi si Obligatii",
];

const isPromoPost = (post) => Boolean(post?.isPromo);

const buildHomepageSections = (allPosts) => {
	const unique = dedupePostsBySlug(allPosts);
	const sorted = [...unique].filter(isEligible).sort(comparePostsByDateDesc);

	const usedSlugs = new Set();
	const remaining = () => sorted.filter((p) => !usedSlugs.has(p.slug));
	const remainingNonPromo = () => remaining().filter((p) => !isPromoPost(p));
	const activePromos = sorted.filter(isActivePromo);
	const promoPriority = () => activePromos.filter((p) => !usedSlugs.has(p.slug));

	const recentPool = () => buildTodayThenYesterdayPool(remainingNonPromo());

	// Hero: always the newest eligible articles (by publish date)
	const heroPosts = takeUnique(remainingNonPromo(), HERO_HOME_COUNT, usedSlugs, promoPriority());

	const topBarPosts = takeUnique(recentPool(), TOP_BAR_COUNT, usedSlugs, promoPriority());

	const spotlightPosts = takeUnique(remaining(), SPOTLIGHT_HOME_LIMIT, usedSlugs, promoPriority());

	const tabbedPosts = takeUnique(
		remaining().filter((p) => LOCAL_CATES.includes(p.cate)),
		7,
		usedSlugs,
		promoPriority(),
	);

	const cardRowPosts = takeUnique(
		remaining().filter((p) => p.cate === "Justitie, Procese si Litigii"),
		3,
		usedSlugs,
		promoPriority(),
	);

	const latestPosts = takeUnique(remaining(), 6, usedSlugs, promoPriority());
	const reviewPosts = takeUnique(remaining(), 4, usedSlugs, promoPriority());
	const trendingPosts = takeUnique(remaining(), 8, usedSlugs, promoPriority());
	const recentPosts = takeUnique(remaining(), 4, usedSlugs, promoPriority());
	const popularPosts = takeUnique(remaining(), 4, usedSlugs, promoPriority());

	const categoryCounts = sorted.reduce((acc, post) => {
		if (post.cate) acc[post.cate] = (acc[post.cate] || 0) + 1;
		return acc;
	}, {});

	const footerCategories = Object.entries(categoryCounts).map(([name, count]) => ({
		name,
		count,
	}));

	const footerTags = [...new Set(sorted.flatMap((p) => p.tags || []).filter(Boolean))].slice(0, 12);

	return {
		topBarPosts,
		heroPosts,
		spotlightPosts,
		tabbedPosts,
		cardRowPosts,
		latestPosts,
		reviewPosts,
		sidebarPosts: [
			...sorted.filter((p) => LOCAL_CATES.includes(p.cate)).slice(0, 15),
			...sorted.filter((p) => p.cate === "Evenimente si cultura").slice(0, 15),
		],
		trendingPosts,
		recentPosts,
		popularPosts,
		footerCategories,
		footerTags,
	};
};

export { buildHomepageSections, isEligible, isActivePromo, parsePostDate };
