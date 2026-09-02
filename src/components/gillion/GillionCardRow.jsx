import Image from "next/image";
import Link from "next/link";
import GillionMeta from "./GillionMeta";
import { postScore } from "../../utils/gillionScore";

const GillionCardRow = ({ posts = [], title = "Evenimente și cultură" }) => {
	const items = posts.filter((p) => p.featureImg && p.slug).slice(0, 3);
	if (!items.length) return null;

	return (
		<section className="gillion-page-section">
			<div className="gillion-page-section__inner">
				<div className="gillion-section-head gillion-section-head--accent">
					<h2>{title}</h2>
				</div>
				<div className="gillion-card-row">
					{items.map((post) => (
						<article className="gillion-card-row__item" key={post.slug}>
							<Link href={`/post/${post.slug}`} className="gillion-card-row__media">
								<Image src={post.featureImg} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
								<span className="gillion-tabbed__cat-pill">{post.cate}</span>
								{post.story && (
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
			</div>
		</section>
	);
};

export default GillionCardRow;
