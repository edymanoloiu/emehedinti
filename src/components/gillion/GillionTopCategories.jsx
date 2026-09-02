import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";

import { isLocalNewsCate } from "../../utils/categories";

const LOCAL_FILTER_KEY = "local";

const FILTERS = [
	{ key: "all", label: "Toate" },
	{ key: LOCAL_FILTER_KEY, label: "Azi în Mehedinți" },
	{ key: "Evenimente si cultura", label: "Evenimente" },
];

const GillionTopCategories = ({ posts = [] }) => {
	const [active, setActive] = useState("all");

	const filtered =
		active === "all"
			? posts
			: active === LOCAL_FILTER_KEY
				? posts.filter((p) => isLocalNewsCate(p.cate))
				: posts.filter((p) => p.cate === active);

	const featured = filtered[0];
	const sidebar = filtered.slice(1, 4);

	if (!featured) return null;

	return (
		<section className="gillion-top-cat">
			<div className="gillion-section-head">
				<h2>În centrul atenției</h2>
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
			<div className="gillion-top-cat__layout">
				<div className="gillion-top-cat__featured">
					<Link href={`/post/${featured.slug}`} className="gillion-top-cat__featured-media">
						<Image src={featured.featureImg} alt={featured.title} fill sizes="(max-width: 700px) 70vw, 700px" />
					</Link>
					<div className="gillion-top-cat__featured-overlay">
						<div className="gillion-hero__cats">
							<Link href={`/categorie/${slugify(featured.cate)}`}>{featured.cate}</Link>
						</div>
						<h3>
							<Link href={`/post/${featured.slug}`}>{featured.title}</Link>
						</h3>
					</div>
				</div>
				<div>
					{sidebar.map((post) => (
						<Link href={`/post/${post.slug}`} className="gillion-top-cat__sidebar-item" key={post.slug}>
							<div className="gillion-top-cat__sidebar-thumb">
								<Image src={post.featureImg} alt={post.title} fill sizes="72px" />
							</div>
							<div>
								<h4 className="gillion-top-cat__sidebar-title">{post.title}</h4>
								<GillionMeta data={post} showReadTime plain />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default GillionTopCategories;
