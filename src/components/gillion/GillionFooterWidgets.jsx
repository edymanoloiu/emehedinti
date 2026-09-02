import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";

const GillionFooterWidgets = ({
	trendingPosts = [],
	recentPosts = [],
	popularPosts = [],
	footerCategories = [],
	footerTags = [],
}) => {
	const [tab, setTab] = useState("recent");
	const [trendIndex, setTrendIndex] = useState(0);

	const trendingSlides = trendingPosts;
	const tabPosts = tab === "popular" ? popularPosts : recentPosts;

	const safeTrendIndex = trendingSlides.length
		? trendIndex % trendingSlides.length
		: 0;
	const currentTrend = trendingSlides[safeTrendIndex];

	const goTrend = (dir) => {
		if (!trendingSlides.length) return;
		setTrendIndex((i) => (i + dir + trendingSlides.length) % trendingSlides.length);
	};

	return (
		<section className="gillion-footer-widgets">
			<div className="gillion-footer-widgets__inner">
				<div className="gillion-widget">
					<h3>
						În trend
						{trendingSlides.length > 1 && (
							<span className="gillion-trending__nav">
								<button type="button" onClick={() => goTrend(-1)} aria-label="Articol anterior">
									‹
								</button>
								<button type="button" onClick={() => goTrend(1)} aria-label="Articol următor">
									›
								</button>
							</span>
						)}
					</h3>
					{currentTrend ? (
						<div className="gillion-trending__carousel">
							<Link href={`/post/${currentTrend.slug}`} className="gillion-trending__slide">
								<Image
									src={currentTrend.featureImg}
									alt={currentTrend.title}
									fill
									sizes="400px"
								/>
								<div className="gillion-trending__overlay">
									<h4>{currentTrend.title}</h4>
									<GillionMeta data={currentTrend} light plain />
								</div>
							</Link>
							{trendingSlides.length > 1 && (
								<div className="gillion-trending__dots">
									{trendingSlides.map((post, i) => (
										<button
											key={post.slug}
											type="button"
											className={i === safeTrendIndex ? "active" : ""}
											onClick={() => setTrendIndex(i)}
											aria-label={`Slide ${i + 1}`}
										/>
									))}
								</div>
							)}
						</div>
					) : (
						<p className="gillion-trending__empty">Niciun articol disponibil momentan.</p>
					)}
				</div>

				<div className="gillion-widget">
					<div className="gillion-tabs">
						<button type="button" className={tab === "recent" ? "active" : ""} onClick={() => setTab("recent")}>
							Recente
						</button>
						<button type="button" className={tab === "popular" ? "active" : ""} onClick={() => setTab("popular")}>
							Populare
						</button>
					</div>
					{tabPosts.map((post) => (
						<Link href={`/post/${post.slug}`} className="gillion-tab-list__item" key={post.slug}>
							<div className="gillion-tab-list__thumb">
								<Image src={post.featureImg} alt={post.title} fill sizes="70px" />
							</div>
							<div>
								<h4 className="gillion-tab-list__title">{post.title}</h4>
								<GillionMeta data={post} plain />
							</div>
						</Link>
					))}
				</div>

				<div className="gillion-widget">
					<h3>Categorii</h3>
					<ul className="gillion-cat-list">
						{footerCategories.map((cat) => (
							<li key={slugify(cat.name)}>
								<Link href={`/categorie/${slugify(cat.name)}`}>{cat.name}</Link>
								<span>{cat.count}</span>
							</li>
						))}
					</ul>
					<h3 style={{ marginTop: 28 }}>Etichete</h3>
					<div className="gillion-tags">
						{footerTags.map((tag) => (
							<Link href={`/categorie/${slugify(tag)}`} key={tag}>
								#{tag}
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default GillionFooterWidgets;
