import Image from "next/image";
import Link from "next/link";

export const BINE_DE_STIUT_HOME_LIMIT = 20;

const getImportedImage = (item) => {
	const enclosure = item?.enclosure?.url;
	if (enclosure) return enclosure;
	const encoded = item?.["content:encoded"] || item?.content;
	if (encoded) {
		const match = encoded.match(/<img[^>]+src="([^">]+)"/i);
		if (match?.[1]) return match[1];
	}
	return null;
};

const buildImageUrl = (item, imageUrl) => {
	if (!imageUrl) return null;
	try {
		return new URL(imageUrl).toString();
	} catch {
		/* relative */
	}
	if (!item?.link) return null;
	try {
		return new URL(imageUrl, new URL(item.link).origin).toString();
	} catch {
		return null;
	}
};

const NationalCard = ({ item }) => {
	const imageUrl = buildImageUrl(item, getImportedImage(item));
	const href = item?.link || "#";

	return (
		<article className="gillion-card-row__item gillion-card-row__item--imported">
			<Link href={href} className="gillion-card-row__media" target="_blank" rel="noopener noreferrer">
				{imageUrl ? (
					<Image src={imageUrl} alt={item.title || ""} fill sizes="33vw" unoptimized />
				) : (
					<span className="gillion-imported__thumb-placeholder" />
				)}
				<span className="gillion-tabbed__cat-pill">Știri naționale</span>
			</Link>
			<h3>
				<Link href={href} target="_blank" rel="noopener noreferrer">{item.title}</Link>
			</h3>
		</article>
	);
};

const PartnerRow = ({ item }) => {
	const imageUrl = buildImageUrl(item, getImportedImage(item));
	const href = item?.link || "#";

	return (
		<Link href={href} className="gillion-tabbed__list-item" target="_blank" rel="noopener noreferrer">
			<div className="gillion-tabbed__list-thumb">
				{imageUrl ? (
					<Image src={imageUrl} alt={item.title || ""} fill sizes="96px" unoptimized />
				) : (
					<span className="gillion-imported__thumb-placeholder" />
				)}
			</div>
			<div>
				<h4>{item.title}</h4>
			</div>
		</Link>
	);
};

const GillionImportedFeeds = ({ nationalPosts = [], partnerPosts = [] }) => {
	const national = (nationalPosts || []).slice(0, 3);
	const partners = (partnerPosts || []).slice(0, BINE_DE_STIUT_HOME_LIMIT);

	if (!national.length && !partners.length) return null;

	return (
		<>
			{national.length > 0 && (
				<section className="gillion-page-section">
					<div className="gillion-page-section__inner">
						<div className="gillion-section-head gillion-section-head--accent">
							<h2>Știri naționale și internaționale</h2>
							<Link href="/categorie/stiri-nationale-si-internationale" className="gillion-section-head__link">
								Toate știrile
							</Link>
						</div>
						<div className="gillion-card-row">
							{national.map((item, index) => (
								<NationalCard key={item?.guid || item?.link || index} item={item} />
							))}
						</div>
					</div>
				</section>
			)}

			{partners.length > 0 && (
				<section className="gillion-page-section gillion-page-section--alt">
					<div className="gillion-page-section__inner">
						<div className="gillion-section-head gillion-section-head--accent">
							<h2>Bine de știut</h2>
						</div>
						<div className="gillion-tabbed__list gillion-tabbed__list--partners">
							{partners.map((item, index) => (
								<PartnerRow key={item?.guid || item?.link || index} item={item} />
							))}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default GillionImportedFeeds;
