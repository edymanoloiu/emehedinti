import { getAllPosts } from "../../lib/api";
import { fetchPartnerSitemaps } from "../../lib/partnerRssFeeds";
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



export async function getServerSideProps({ res }) {
	if (res) {
		res.setHeader(
			"Cache-Control",
			"public, s-maxage=300, stale-while-revalidate=86400",
		);
		res.setHeader(
			"CDN-Cache-Control",
			"public, s-maxage=300, stale-while-revalidate=86400",
		);
	}


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

	const sitemaps = await fetchPartnerSitemaps();
const partnerFeedLimit = BINE_DE_STIUT_HOME_LIMIT;
	const takeLatestRss = (result) =>
		sortRssItemsByDateDesc(result?.value?.items || []).slice(0, partnerFeedLimit);

	// sitemaps from fetchPartnerSitemaps()

	return {
		props: {
			...buildHomepageSections(allPosts),
			sitemaps,
		},
	};
};
