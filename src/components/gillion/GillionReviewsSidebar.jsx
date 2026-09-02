import Image from "next/image";
import Link from "next/link";
import GillionMeta from "./GillionMeta";
import { postScore } from "../../utils/gillionScore";

const GillionReviewsSidebar = ({ posts = [] }) => {
	const reviews = posts.filter((p) => p.featureImg && p.slug).slice(0, 4);

	return (
		<aside className="gillion-sidebar-panel">
			<div className="gillion-section-head gillion-section-head--accent">
				<h2>Recenzii</h2>
			</div>
			{reviews.length > 0 ? (
				<ul className="gillion-reviews-list">
					{reviews.map((post) => (
						<li key={post.slug}>
							<Link href={`/post/${post.slug}`} className="gillion-reviews-list__item">
								<div className="gillion-reviews-list__thumb">
									<Image src={post.featureImg} alt={post.title} fill sizes="72px" />
									<span className="gillion-score-badge gillion-score-badge--sm">{postScore(post.slug)}</span>
								</div>
								<div>
									<h4>{post.title}</h4>
									<GillionMeta data={post} plain />
								</div>
							</Link>
						</li>
					))}
				</ul>
			) : null}
			<div className="gillion-sidebar__ad gillion-sidebar__ad--tall">SPAȚIU PUBLICITAR</div>
		</aside>
	);
};

export default GillionReviewsSidebar;
