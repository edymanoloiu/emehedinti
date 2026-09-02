import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";
import GillionNewsletterForm from "./GillionNewsletterForm";
import { postScore } from "../../utils/gillionScore";

import { isLocalNewsCate } from "../../utils/categories";

const SIDEBAR_TABS = [
	{ key: "azi", label: "Azi în Mehedinți", cate: "Azi in Mehedinti" },
	{ key: "evenimente", label: "Evenimente", cate: "Evenimente si cultura" },
];

const GillionNewestGrid = ({ posts = [], sidebarPosts = [] }) => {
	const [tab, setTab] = useState("azi");
	const gridPosts = posts.filter((p) => p.featureImg && p.slug).slice(0, 6);
	const activeTab = SIDEBAR_TABS.find((t) => t.key === tab) || SIDEBAR_TABS[0];
	const tabPosts = sidebarPosts
		.filter((p) => {
			if (!p.featureImg || !p.slug) return false;
			if (tab === "azi") {
				return isLocalNewsCate(p.cate);
			}
			return p.cate === activeTab.cate;
		})
		.slice(0, 1);

	if (!gridPosts.length) return null;

	return (
		<section className="gillion-page-section gillion-page-section--alt">
			<div className="gillion-page-section__inner gillion-page-section__inner--split">
				<div className="gillion-page-section__main">
					<div className="gillion-section-head gillion-section-head--accent">
						<h2>Ultimele articole</h2>
					</div>
					<div className="gillion-newest-grid">
						{gridPosts.map((post) => (
							<article className="gillion-newest-grid__card" key={post.slug}>
								<Link href={`/post/${post.slug}`} className="gillion-newest-grid__media">
									<Image src={post.featureImg} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" />
									<span className="gillion-tabbed__cat-pill">{post.cate}</span>
									{post.trending && (
										<span className="gillion-score-badge">{postScore(post.slug)}</span>
									)}
								</Link>
								<h3>
									<Link href={`/post/${post.slug}`}>{post.title}</Link>
								</h3>
								<GillionMeta data={post} showReadTime />
							</article>
						))}
					</div>
					<Link href="/stiri" className="gillion-load-more">
						Încarcă mai multe
					</Link>
				</div>

				<aside className="gillion-sidebar-panel">
					<div className="gillion-section-head gillion-section-head--accent">
						<h2>Abonează-te la newsletter</h2>
					</div>
					<GillionNewsletterForm
						source="sidebar"
						note="* Primești cele mai importante știri din Mehedinți direct în inbox."
					/>

					<div className="gillion-section-head gillion-section-head--accent gillion-section-head--tabs">
						<h2>De interes</h2>
						<div className="gillion-section-head__tabs gillion-section-head__tabs--sm">
							{SIDEBAR_TABS.map((t) => (
								<button
									key={t.key}
									type="button"
									className={tab === t.key ? "active" : ""}
									onClick={() => setTab(t.key)}
								>
									{t.label}
								</button>
							))}
						</div>
					</div>

					{tabPosts.map((post) => (
						<article className="gillion-sidebar-feature" key={post.slug}>
							<Link href={`/post/${post.slug}`} className="gillion-sidebar-feature__media">
								<Image src={post.featureImg} alt={post.title} fill sizes="320px" />
							</Link>
							<h4>
								<Link href={`/post/${post.slug}`}>{post.title}</Link>
							</h4>
							<GillionMeta data={post} showReadTime />
							{post.excerpt && <p>{post.excerpt.substring(0, 140)}…</p>}
						</article>
					))}
				</aside>
			</div>
		</section>
	);
};

export default GillionNewestGrid;
