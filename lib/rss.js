import RSS from 'rss';
import { isRecomandarePost } from './recomandarePosts.js';

export function generateRssFeed(posts) {
	const siteUrl = 'https://emehedinti.ro';
	const feed = new RSS({
		title: 'Azi în Drobeta | Cele mai importante știri din Drobeta-Turnu Severin. Află tot ce contează, azi, în Drobeta-Turnu Severin.',
		description: '„Azi în Drobeta” este platforma digitală dedicată locuitorilor din Drobeta-Turnu Severin și celor interesați de viața orașului de pe malul Dunării. Aici găsești zilnic știri locale, evenimente importante, informații utile, interviuri și povești despre oameni și locuri care dau identitate comunității. Cu un conținut echilibrat, accesibil și actualizat constant, „Azi în Drobeta” devine ghidul tău zilnic pentru tot ce contează în Severin – de la administrație și cultură până la stil de viață și inițiative locale.',
		site_url: siteUrl,
		feed_url: `${siteUrl}/rss.xml`,
		language: 'ro',
		image_url: 'https://emehedinti.ro/images/cropped_image.png',
	});

	posts.slice(0, 50).forEach((post) => {
		if (!post?.slug || !post?.title) return;
		const segment = isRecomandarePost(post) ? 'recomandare' : 'post';
		const itemUrl = `${siteUrl}/${segment}/${post.slug}/`;
		const imageUrl = post.featureImg
			? post.featureImg.startsWith('http')
				? post.featureImg
				: `${siteUrl}${post.featureImg.startsWith('/') ? '' : '/'}${post.featureImg}`
			: undefined;

		const item = {
			title: post.title,
			description: post.excerpt || '',
			url: itemUrl,
			guid: itemUrl,
			date: post.date,
			categories: post.tags || (post.cate ? [post.cate] : []),
		};

		if (post.author_name) {
			item.author = post.author_name;
		}

		if (imageUrl) {
			item.enclosure = {
				url: imageUrl,
				type: 'image/jpeg',
			};
		}

		feed.item(item);
	});

	return feed.xml({ indent: true });
}
