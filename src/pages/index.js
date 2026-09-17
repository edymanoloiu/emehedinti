import Parser from 'rss-parser';
import { getAllPosts } from "../../lib/api";
import { isRecomandarePost } from "../../lib/recomandarePosts";
import HeadMeta from "../components/elements/HeadMeta";
import HeaderOne from "../components/header/HeaderOne";
import GillionHeroGrid from "../components/gillion/GillionHeroGrid";
import GillionTopBar from "../components/gillion/GillionTopBar";
import GillionSpotlight from "../components/gillion/GillionSpotlight";
import GillionTabbedSection from "../components/gillion/GillionTabbedSection";
import GillionCardRow from "../components/gillion/GillionCardRow";
import GillionNewestGrid from "../components/gillion/GillionNewestGrid";
import GillionImportedFeeds, {
	BINE_DE_STIUT_HOME_LIMIT,
} from "../components/gillion/GillionImportedFeeds";
import GillionSiteFooter from "../components/gillion/GillionSiteFooter";
import {
	buildHomepageSections,
	comparePostsByDateDesc,
	sortRssItemsByDateDesc,
} from "../utils/homepagePosts";
import publication from "../data/publication";

const HomeOne = ({
	topBarPosts,
	heroPosts,
	spotlightPosts,
	tabbedPosts,
	cardRowPosts,
	latestPosts,
	reviewPosts,
	sidebarPosts,
	recentPosts,
	footerCategories,
	sitemaps,
}) => {
	const partnerPosts = sortRssItemsByDateDesc(
		Object.entries(sitemaps || {})
			.filter(([key]) => key !== "pc")
			.flatMap(([, items]) => items || [])
	).slice(0, BINE_DE_STIUT_HOME_LIMIT);

	return (
		<>
			<HeadMeta
				fullPageTitle={publication.seo.title}
				metaDesc={publication.seo.description}
				ogTitle={publication.seo.openGraph.title}
				ogDescription={publication.seo.openGraph.description}
				twitterTitle={publication.seo.twitter.title}
				twitterDescription={publication.seo.twitter.description}
			/>
			<HeaderOne />
			<GillionHeroGrid posts={heroPosts} />
			<GillionTopBar posts={topBarPosts} />
			<GillionSpotlight posts={spotlightPosts} />
			<GillionTabbedSection posts={tabbedPosts} reviewPosts={reviewPosts} />
			<GillionCardRow posts={cardRowPosts} title="Evenimente și cultură" />
			<GillionImportedFeeds
				nationalPosts={sortRssItemsByDateDesc(sitemaps?.pc ?? [])}
				partnerPosts={partnerPosts}
				autoPosts={sortRssItemsByDateDesc(sitemaps?.cm ?? []).slice(0, 6)}
			/>
			<GillionNewestGrid posts={latestPosts} sidebarPosts={sidebarPosts} />
			<GillionSiteFooter recentPosts={recentPosts} footerCategories={footerCategories} />
		</>
	);
};

export default HomeOne;


async function fetchCautiMasinaItems(parser, limit = 6) {
	const urls = ["https://cautimasina.ro/feed.rss", "https://cautimasina.ro/rss.xml"];
	for (let attempt = 0; attempt < 3; attempt += 1) {
		try {
			let feed = null;
			for (const url of urls) {
				try {
					feed = await parser.parseURL(url);
					if (feed?.items?.length) break;
				} catch {
					feed = null;
				}
			}
			if (!feed) throw new Error("CautiMasina feed unavailable");
			const items = (feed?.items || [])
				.filter(
					(item) =>
						item?.title &&
						item?.link &&
						/cautimasina\.ro/i.test(String(item.link))
				)
				.slice(0, limit);
			if (items.length) return items;
		} catch (err) {
			// retry on 429 / timeout
		}
		await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
	}
	return [];
}

export async function getServerSideProps() {
	const posts = (await getAllPosts([
		'postFormat',
		'trending',
		'story',
		'slug',
		'title',
		'excerpt',
		'featureImg',
		'thumb',
		'cate',
		'cate_bg',
		'cate_img',
		'author_name',
		'date',
		'post_views',
		'post_share',
		'featureImgSrc',
		'isPromo',
		'tags',
		'isAd',
	]))
		.filter((post) => !isRecomandarePost(post))
		.sort(comparePostsByDateDesc);

	const allPosts = posts;

	const weboSitemaps = await Promise.allSettled([
		new Parser({ timeout: 2000 }).parseURL('https://obliqdesign.ro/rss.xml'),
		new Parser({ timeout: 2000 }).parseURL('https://meritasamergi.ro/rss.xml'),
		new Parser({ timeout: 2000 }).parseURL('https://ghidullegal.ro/rss.xml'),
		new Parser({ timeout: 2000 }).parseURL('https://sfaturidesanatate.ro/rss.xml'),
		new Parser({ timeout: 2000 }).parseURL('https://ghidulgospodarului.ro/rss.xml'),
		new Parser({ timeout: 2000 }).parseURL('https://azicemancam.ro/rss.xml'),
		new Parser({ timeout: 2000 }).parseURL('https://painesicirc.ro/rss.xml'),
	]);

	const cmItems = await fetchCautiMasinaItems(new Parser({ timeout: 8000 }), 6);

	const partnerFeedLimit = BINE_DE_STIUT_HOME_LIMIT;
	const takeLatestRss = (result) =>
		sortRssItemsByDateDesc(result?.value?.items || []).slice(0, partnerFeedLimit);

	const sitemaps = {
		obliq: takeLatestRss(weboSitemaps[0]),
		mm: takeLatestRss(weboSitemaps[1]),
		legal: takeLatestRss(weboSitemaps[2]),
		sanatate: takeLatestRss(weboSitemaps[3]),
		gospodar: takeLatestRss(weboSitemaps[4]),
		azi: takeLatestRss(weboSitemaps[5]),
		cm: cmItems,
		pc: sortRssItemsByDateDesc(weboSitemaps[6]?.value?.items || []).slice(0, 10),
	};

	return {
		props: {
			...buildHomepageSections(allPosts),
			sitemaps,
		},
	};
};
