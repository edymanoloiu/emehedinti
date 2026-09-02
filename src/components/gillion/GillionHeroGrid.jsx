import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";

const HeroTile = ({ post, size = "small" }) => (
	<article className={`gillion-hero-grid__tile gillion-hero-grid__tile--${size}`}>
		<Link href={`/post/${post.slug}`} className="gillion-hero-grid__media">
			<Image src={heroImage(post)} alt={post.title} fill sizes={size === "main" ? "50vw" : "25vw"} priority={size === "main"} />
		</Link>
		<div className="gillion-hero-grid__overlay">
			<Link href={`/categorie/${slugify(post.cate)}`} className="gillion-hero-grid__cat">
				{post.cate}
			</Link>
			<h2 className="gillion-hero-grid__title">
				<Link href={`/post/${post.slug}`}>{post.title}</Link>
			</h2>
			<GillionMeta data={post} showReadTime light plain />
		</div>
	</article>
);

const HERO_SLOT_COUNT = 5;

const heroImage = (post) => post?.featureImg || post?.thumb;

const GillionHeroGrid = ({ posts }) => {
	const slides = (posts || [])
		.filter((p) => p.slug && heroImage(p))
		.slice(0, HERO_SLOT_COUNT);

	const [leftTop, leftBottom, main, rightTop, rightBottom] = slides;

	return (
		<section className="gillion-hero-grid" aria-label="Știrile zilei">
			{slides.length >= HERO_SLOT_COUNT ? (
				<div className="gillion-hero-grid__inner">
					<div className="gillion-hero-grid__col gillion-hero-grid__col--left">
						<HeroTile post={leftTop} />
						<HeroTile post={leftBottom} />
					</div>
					<HeroTile post={main} size="main" />
					<div className="gillion-hero-grid__col gillion-hero-grid__col--right">
						<HeroTile post={rightTop} />
						<HeroTile post={rightBottom} />
					</div>
				</div>
			) : (
				<div className="gillion-hero-grid__empty">
					<p>Nu există articole pentru azi sau ieri. Vezi arhiva completă.</p>
					<Link href="/stiri">Vezi toate știrile</Link>
				</div>
			)}
		</section>
	);
};

export default GillionHeroGrid;
