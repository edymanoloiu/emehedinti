import Script from 'next/script'
import ConsentFooter from "../components/consentFooter";
import Router from 'next/router';
import { useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/gillion.css";
import "../styles/gillion-home.css";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const loadLink = (href) => {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = href;
			document.head.appendChild(link);
		};
		loadLink('/css/fontawesome-all.min.css');
		loadLink('/css/iconfont.css');
		loadLink('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500&display=swap');
	}, []);

	useEffect(() => {
		document.body.classList.add('gillion-theme');
		return () => document.body.classList.remove('gillion-theme');
	}, []);

	useEffect(() => {
		const handleRouteChange = (url) => {
			window.gtag('config', 'G-S5VGH4XWRB', { page_path: url });
		};
		Router.events.on('routeChangeComplete', handleRouteChange);
		return () => Router.events.off('routeChangeComplete', handleRouteChange);
	}, [Router.events]);

	return (
		<>
			{/*  Global site tag (gtag.js) - Google Analytics */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-S5VGH4XWRB"
				strategy="afterInteractive"
			/>
			{/* Temporarily disabled while AdOcean campaign runs.
			    Re-enable when restoring AdSense ad units on page. */}
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('consent', 'default', {
						'ad_storage': 'granted',
						'analytics_storage': 'granted',
						'functionality_storage': 'granted',
						'personalization_storage': 'granted',
						'security_storage': 'granted'
					});

					gtag('config', 'G-S5VGH4XWRB', { page_path: window.location.pathname });
				`}
			</Script>

			<ConsentFooter />
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
