import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";

const CategoryColumn = ({ title, slug, posts, btnText }) => {
	const featured = posts[0];
	const list = posts.slice(1, 4);

	if (!featured) return null;

	return (
		<div className="gillion-cat-col">
			<div className="gillion-section-head">
				<h2>{title}</h2>
				<Link href={`/categorie/${slug}`} className="gillion-section-head__link">
					{btnText || "Vezi toate"}
				</Link>
			</div>
			<Link href={`/post/${featured.slug}`} className="gillion-cat-col__featured">
				<Image src={featured.featureImg} alt={featured.title} fill sizes="(max-width: 400px) 100vw, 400px" />
				<div className="gillion-cat-col__featured-overlay">
					<h3>{featured.title}</h3>
					<GillionMeta data={featured} light plain />
				</div>
			</Link>
			<ul className="gillion-cat-col__list">
				{list.map((post) => (
					<li key={post.slug}>
						<Link href={`/post/${post.slug}`} className="gillion-cat-col__list-item">
							<span className="gillion-cat-col__bullet" />
							<div>
								<h4 className="gillion-cat-col__list-title">{post.title}</h4>
								<GillionMeta data={post} plain />
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const GillionCategoryColumns = ({ categories }) => {
	return (
		<section className="gillion-categories">
			<div className="gillion-categories__grid">
				{categories.map((cat) => (
					<CategoryColumn key={cat.slug} {...cat} />
				))}
			</div>
		</section>
	);
};

export default GillionCategoryColumns;
