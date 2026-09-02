import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";

const GillionLatestPosts = ({ latestPosts = [], hotTopicsPosts = [] }) => {
	const posts = latestPosts;
	const hotTopics = hotTopicsPosts;

	return (
		<section className="gillion-latest">
			<div className="gillion-latest__layout">
				<div>
					<div className="gillion-section-head">
						<h2>Ultimele articole</h2>
					</div>
					{posts.map((post, i) => (
						<article
							className={`gillion-latest__post ${i % 2 === 1 ? "gillion-latest__post--reverse" : ""}`}
							key={post.slug}
						>
							<Link href={`/post/${post.slug}`} className="gillion-latest__img">
								<Image src={post.featureImg} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" />
							</Link>
							<div className="gillion-latest__content">
								<div className="gillion-latest__cat">
									<Link href={`/categorie/${slugify(post.cate)}`}>{post.cate}</Link>
								</div>
								<h3 className="gillion-latest__title">
									<Link href={`/post/${post.slug}`}>{post.title}</Link>
								</h3>
								<GillionMeta data={post} showReadTime />
							</div>
						</article>
					))}
				</div>
				<aside className="gillion-sidebar">
					<div className="gillion-section-head">
						<h2>Reclamă</h2>
					</div>
					<div className="gillion-sidebar__ad">SPAȚIU PUBLICITAR</div>
					<div className="gillion-section-head">
						<h2>Subiecte populare</h2>
					</div>
					{hotTopics.map((post) => (
						<Link href={`/post/${post.slug}`} className="gillion-sidebar__list-item" key={post.slug}>
							<div className="gillion-sidebar__list-thumb">
								<Image src={post.featureImg} alt={post.title} fill sizes="80px" />
							</div>
							<div>
								<h4 className="gillion-sidebar__list-title">{post.title}</h4>
								<GillionMeta data={post} plain />
							</div>
						</Link>
					))}
				</aside>
			</div>
		</section>
	);
};

export default GillionLatestPosts;
