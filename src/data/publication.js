/**
 * Configurație centrală a publicației.
 * Domeniul canonic este explicit — nu se deduce din headere HTTP.
 */

const publication = {
	publicationName: "eMehedinți",
	publicationTagline: "Mehedinți, de la Dunăre la comunitate",
	canonicalDomain: "https://emehedinti.ro",
	city: "Drobeta-Turnu Severin",
	county: "Mehedinți",
	region: "Sud-Vest",
	latitude: 44.631,
	longitude: 22.656,
	locale: 'ro-RO',
	language: 'ro',
	timezone: 'Europe/Bucharest',
	logo: '/images/logo.png',
	defaultSocialImage: '/images/logo.png',
	favicon: '/images/cropped_image.png',
	editorialEmail: 'contact@weboratory.ro',
	legalCompanyName: 'Weboratory Capital SRL',
	publisherInformation: {
		name: 'Weboratory Capital SRL',
		email: 'contact@weboratory.ro',
		website: 'https://www.weboratory.ro',
	},
	socialProfiles: [],
	foundingDate: '2024-01-01',
	coverageArea: "Județul Mehedinți, România",
	editorialPositioning:
		"Publicație județeană cu identitate construită în jurul Dunării, Porților de Fier și comunităților din Mehedinți.",
	nearbyLocalities: ["Orșova", "Strehaia", "Vânju Mare", "Baia de Aramă"],
	mapProvider: 'openstreetmap',
	mapsEnabled: true,
	environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	isIndexable: process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview' && process.env.CF_PAGES_BRANCH !== 'preview',
	localCate: "Azi in Mehedinti",
	categorySlug: "azi-in-mehedinti",
	tagMinIndexCount: 5,
	correctionEmail: 'contact@weboratory.ro',
	ogLocale: 'ro_RO',
	seo: {
		title: "eMehedinți - Știri din Mehedinți și Drobeta-Turnu Severin",
		titleTemplate: "%s | eMehedinți",
		description:
			"Știri din Mehedinți, Drobeta-Turnu Severin, Orșova și întreg județul. Actualitate, Dunărea, turism, administrație, trafic, evenimente și comunitate.",
		homepageH1: "Știri din Mehedinți",
		homepageIntro:
			"Știrile care contează din Drobeta-Turnu Severin, Orșova și întreg județul Mehedinți, cu informații despre administrație, Dunăre, turism, trafic și comunitate.",
		openGraph: {
			type: "website",
			siteName: "eMehedinți",
			title: "eMehedinți - Știrile județului Mehedinți",
			description:
				"Actualitate din Drobeta-Turnu Severin, Orșova și întreg județul Mehedinți, de la administrație la turism și viața de pe Dunăre.",
			locale: "ro_RO",
		},
		twitter: {
			card: "summary_large_image",
			title: "eMehedinți - Știri locale din Mehedinți",
			description:
				"Informații din Drobeta-Turnu Severin, Orșova și comunitățile județului Mehedinți.",
		},
		schema: {
			type: "NewsMediaOrganization",
			name: "eMehedinți",
			alternateName: "eMehedinti.ro",
			areaServed: "Județul Mehedinți, România",
		},
	},
};

export default publication;
