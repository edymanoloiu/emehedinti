import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "../../utils";
import GillionMeta from "./GillionMeta";

const GillionHero = ({ posts }) => {
	const slides = (posts || []).filter((p) => p.featureImg && p.slug).slice(0, 5);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (slides.length <= 1) return undefined;
		const timer = setInterval(() => {
			setIndex((i) => (i + 1) % slides.length);
		}, 6000);
		return () => clearInterval(timer);
	}, [slides.length]);

	if (!slides.length) return null;

	const current = slides[index % slides.length];

	return (
		<section className="gillion-hero">
			<div className="gillion-hero__carousel">
				<div className="gillion-hero__slide">
					<Link href={`/post/${current.slug}`} className="gillion-hero__media" aria-hidden tabIndex={-1}>
						<Image
							src={current.featureImg}
							alt=""
							fill
							priority
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
						/>
					</Link>
					<div className="gillion-hero__overlay">
						<div className="gillion-hero__cats">
							<Link href={`/categorie/${slugify(current.cate)}`}>{current.cate}</Link>
						</div>
						<h1 className="gillion-hero__title">
							<Link href={`/post/${current.slug}`}>{current.title}</Link>
						</h1>
						<GillionMeta data={current} showReadTime light plain />
					</div>
				</div>

				{slides.length > 1 && (
					<div className="gillion-hero__dots" aria-label="Navigare slider">
						{slides.map((post, i) => (
							<button
								key={post.slug}
								type="button"
								className={i === index ? "active" : ""}
								onClick={() => setIndex(i)}
								aria-label={`Slide ${i + 1}`}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default GillionHero;
