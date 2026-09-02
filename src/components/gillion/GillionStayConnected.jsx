import SocialLink from "../../data/social/SocialLink.json";

const SOCIAL = [
	{ key: "fb", label: "Like", count: "1.4K", className: "gillion-social-btn--fb", icon: SocialLink.fb.icon, url: "https://web.facebook.com/profile.php?id=61560279465691" },
	{ key: "twitter", label: "Follow", count: "820", className: "gillion-social-btn--tw", icon: SocialLink.twitter.icon, url: SocialLink.twitter.url },
	{ key: "instagram", label: "Follow", count: "540", className: "gillion-social-btn--ig", icon: SocialLink.instagram.icon, url: SocialLink.instagram.url },
	{ key: "yt", label: "Subscribe", count: "310", className: "gillion-social-btn--yt", icon: SocialLink.yt.icon, url: SocialLink.yt.url },
];

const GillionStayConnected = () => (
	<aside className="gillion-sidebar-panel">
		<div className="gillion-section-head gillion-section-head--accent">
			<h2>Rămâi conectat</h2>
		</div>
		<div className="gillion-social-stack">
			{SOCIAL.map((item) => (
				<a
					key={item.key}
					href={item.url}
					className={`gillion-social-btn ${item.className}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span className="gillion-social-btn__left">
						<i className={item.icon} />
						{item.label}
					</span>
					<span className="gillion-social-btn__count">{item.count}</span>
				</a>
			))}
		</div>
	</aside>
);

export default GillionStayConnected;
