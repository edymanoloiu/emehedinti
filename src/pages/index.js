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
				fullPageTitle="Știri Drobeta-Turnu Severin azi | Azi în Drobeta"
				metaDesc="Știri din Drobeta-Turnu Severin azi: administrație, trafic, evenimente și informații utile din municipiu și județul Mehedinți."
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
			/>
			<GillionNewestGrid posts={latestPosts} sidebarPosts={sidebarPosts} />
			<GillionSiteFooter recentPosts={recentPosts} footerCategories={footerCategories} />
		</>
	);
};

export default HomeOne;

export async function getServerSideProps() {
	const posts = getAllPosts([
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
	])
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
		new Parser({ timeout: 2000 }).parseURL('https://cautimasina.ro/rss.xml'),
		new Parser({ timeout: 2000 }).parseURL('https://painesicirc.ro/rss.xml'),
	]);

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
		cm: takeLatestRss(weboSitemaps[6]),
		pc: sortRssItemsByDateDesc(weboSitemaps[7]?.value?.items || []).slice(0, 10),
	};

	return {
		props: {
			...buildHomepageSections(allPosts),
			sitemaps,
		},
	};
};
