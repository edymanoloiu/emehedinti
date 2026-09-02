import Link from "next/link";
import { slugify } from "../../utils";
import GillionNewsletterForm from "./GillionNewsletterForm";
import publication from "../../data/publication";

const GillionSiteFooter = ({ recentPosts = [], footerCategories = [] }) => {
	const reviews = recentPosts.filter((p) => p.slug).slice(0, 3);
	const categories = footerCategories.slice(0, 8);

	return (
		<footer className="gillion-site-footer">
			<div className="gillion-site-footer__inner">
				<div className="gillion-site-footer__col">
					<h3>Abonează-te acum</h3>
					<GillionNewsletterForm
						dark
						source="footer"
						note="* Primești cele mai importante știri din Mehedinți."
					/>
				</div>

				<div className="gillion-site-footer__col">
					<h3>Recenzii</h3>
					<ul className="gillion-site-footer__reviews">
						{reviews.map((post) => (
							<li key={post.slug}>
								<Link href={`/post/${post.slug}`}>{post.title}</Link>
								<span>{post.date}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="gillion-site-footer__col">
					<h3>Categorii</h3>
					<ul className="gillion-site-footer__cats">
						{categories.map((cat) => (
							<li key={slugify(cat.name)}>
								<Link href={`/categorie/${slugify(cat.name)}`}>{cat.name}</Link>
								<span>{cat.count}</span>
							</li>
						))}
					</ul>
					<Link href="/stiri" className="gillion-site-footer__show-all">
						Vezi toate
					</Link>
				</div>
			</div>

			<div className="gillion-site-footer__legal">
				<ul>
					<li><Link href="/reteaua-weboratory">Rețeaua Weboratory</Link></li>
					<li><Link href="/termeni-si-conditii">Termeni și Condiții</Link></li>
					<li><Link href="/gdpr">GDPR</Link></li>
					<li><Link href="/cookies">Cookies</Link></li>
				</ul>
				<p>© {new Date().getFullYear()} {publication.publicationName} · Site realizat de Weboratory Capital</p>
			</div>
		</footer>
	);
};

export default GillionSiteFooter;
