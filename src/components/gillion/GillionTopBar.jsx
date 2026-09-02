import Image from "next/image";
import Link from "next/link";

const GillionTopBar = ({ posts }) => {
	const items = (posts || []).slice(0, 4);

	return (
		<div className="gillion-top-bar">
			<div className="gillion-top-bar__inner">
				{items.length ? items.map((post) => (
					<Link href={`/post/${post.slug}`} className="gillion-top-bar__item" key={post.slug}>
						<div className="gillion-top-bar__thumb">
							<Image src={post.featureImg} alt={post.title} fill sizes="64px" />
						</div>
						<div>
							<div className="gillion-top-bar__cat">{post.cate}</div>
							<h4 className="gillion-top-bar__title">{post.title}</h4>
						</div>
					</Link>
				)) : (
					<p className="gillion-top-bar__empty">Nicio știre pentru azi sau ieri.</p>
				)}
			</div>
		</div>
	);
};

export default GillionTopBar;
