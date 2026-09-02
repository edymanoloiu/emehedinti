import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";
import GillionReviewsSidebar from "./GillionReviewsSidebar";
import { postScore } from "../../utils/gillionScore";

const FILTERS = [
	{ key: "all", label: "Toate" },
	{ key: "Azi in Drobeta‑Turnu Severin", label: "Azi în Drobeta" },
	{ key: "Evenimente si cultura", label: "Evenimente" },
];

const GillionTabbedSection = ({ posts = [], reviewPosts = [], title = "Știri din Drobeta‑Turnu Severin" }) => {
	const [active, setActive] = useState("all");
	const pool = posts.filter((p) => p.featureImg && p.slug);
	const filtered =
		active === "all"
			? pool
			: active === "Azi in Drobeta‑Turnu Severin"
				? pool.filter((p) => p.cate?.includes("Drobeta") && p.cate !== "Evenimente si cultura")
				: pool.filter((p) => p.cate === active);

	const featured = filtered.slice(0, 2);
	const list = filtered.slice(2, 6);
	const bottom = filtered[6];

	if (!pool.length) return null;

	return (
		<section className="gillion-page-section gillion-page-section--alt">
			<div className="gillion-page-section__inner gillion-page-section__inner--split">
				<div className="gillion-page-section__main">
					<div className="gillion-section-head gillion-section-head--accent gillion-section-head--tabs">
						<h2>{title}</h2>
						<div className="gillion-section-head__tabs">
							{FILTERS.map((f) => (
								<button
									key={f.key}
									type="button"
									className={active === f.key ? "active" : ""}
									onClick={() => setActive(f.key)}
								>
									{f.label}
								</button>
							))}
						</div>
					</div>

					<div className="gillion-tabbed__featured">
						{featured.map((post) => (
							<article className="gillion-tabbed__featured-card" key={post.slug}>
								<Link href={`/post/${post.slug}`} className="gillion-tabbed__featured-media">
									<Image src={post.featureImg} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" />
									<span className="gillion-tabbed__cat-pill">{post.cate}</span>
								</Link>
								<h3>
									<Link href={`/post/${post.slug}`}>{post.title}</Link>
								</h3>
								<GillionMeta data={post} showReadTime />
								{post.excerpt && <p className="gillion-tabbed__excerpt">{post.excerpt}</p>}
							</article>
						))}
					</div>

					<div className="gillion-tabbed__list">
						{list.map((post) => (
							<Link href={`/post/${post.slug}`} className="gillion-tabbed__list-item" key={post.slug}>
								<div className="gillion-tabbed__list-thumb">
									<Image src={post.featureImg} alt={post.title} fill sizes="96px" />
									{post.trending && (
										<span className="gillion-score-badge gillion-score-badge--sm">{postScore(post.slug)}</span>
									)}
								</div>
								<div>
									<h4>{post.title}</h4>
									<GillionMeta data={post} showReadTime plain />
								</div>
							</Link>
						))}
					</div>

					{bottom && (
						<article className="gillion-tabbed__bottom">
							<Link href={`/post/${bottom.slug}`} className="gillion-tabbed__bottom-media">
								<Image src={bottom.featureImg} alt={bottom.title} fill sizes="100vw" />
							</Link>
							<div className="gillion-tabbed__bottom-overlay">
								<Link href={`/categorie/${slugify(bottom.cate)}`} className="gillion-tabbed__cat-pill">
									{bottom.cate}
								</Link>
								<h3>
									<Link href={`/post/${bottom.slug}`}>{bottom.title}</Link>
								</h3>
								<GillionMeta data={bottom} showReadTime light plain />
							</div>
						</article>
					)}
				</div>

				<GillionReviewsSidebar posts={reviewPosts} />
			</div>
		</section>
	);
};

export default GillionTabbedSection;
