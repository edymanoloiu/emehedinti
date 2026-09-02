import Image from "next/image";
import Link from "next/link";
import GillionMeta from "./GillionMeta";
import GillionStayConnected from "./GillionStayConnected";
import { postScore } from "../../utils/gillionScore";
import { SPOTLIGHT_HOME_LIMIT } from "../../utils/homepagePosts";

const GillionSpotlight = ({ posts = [] }) => {
	const items = posts.filter((p) => p.featureImg && p.slug).slice(0, SPOTLIGHT_HOME_LIMIT);
	if (!items.length) return null;

	return (
		<section className="gillion-page-section">
			<div className="gillion-page-section__inner gillion-page-section__inner--split">
				<div className="gillion-page-section__main">
					<div className="gillion-section-head gillion-section-head--accent">
						<h2>În centrul atenției azi</h2>
					</div>
					<div className="gillion-spotlight__grid">
						{items.map((post) => (
							<article className="gillion-spotlight__card" key={post.slug}>
								<Link href={`/post/${post.slug}`} className="gillion-spotlight__media">
									<Image src={post.featureImg} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
									{post.story && (
										<span className="gillion-score-badge">{postScore(post.slug)}</span>
									)}
								</Link>
								<h3 className="gillion-spotlight__title">
									<Link href={`/post/${post.slug}`}>{post.title}</Link>
								</h3>
								<GillionMeta data={post} showReadTime />
							</article>
						))}
					</div>
				</div>
				<GillionStayConnected />
			</div>
		</section>
	);
};

export default GillionSpotlight;
