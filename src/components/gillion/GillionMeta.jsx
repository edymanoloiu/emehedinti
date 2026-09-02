import Link from "next/link";
import { slugify } from "../../utils";
import { timeAgo, readTime } from "../../utils/timeAgo";

const GillionMeta = ({ data, showReadTime = false, light = false, plain = false }) => {
	const metaClass = light ? "gillion-meta gillion-meta--light" : "gillion-meta";

	return (
		<div className={metaClass}>
			{data.author_name && (
				<>
					{plain ? (
						<span>{data.author_name}</span>
					) : (
						<Link href={`/autor/${slugify(data.author_name)}`}>{data.author_name}</Link>
					)}
					<span className="gillion-meta__sep" />
				</>
			)}
			<span>{timeAgo(data.date)}</span>
			{data.post_views && (
				<>
					<span className="gillion-meta__sep" />
					<span><i className="feather icon-eye" /> {data.post_views}</span>
				</>
			)}
			{showReadTime && data.excerpt && (
				<>
					<span className="gillion-meta__sep" />
					<span><i className="feather icon-clock" /> {readTime(data.excerpt)}</span>
				</>
			)}
		</div>
	);
};

export default GillionMeta;
