import Parser from 'rss-parser';

const FEED_URLS = [
	'https://obliqdesign.ro/rss.xml',
	'https://meritasamergi.ro/rss.xml',
	'https://ghidullegal.ro/rss.xml',
	'https://sfaturidesanatate.ro/rss.xml',
	'https://ghidulgospodarului.ro/rss.xml',
	'https://azicemancam.ro/rss.xml',
	'https://cautimasina.ro/rss.xml',
	'https://painesicirc.ro/rss.xml',
];

const HEADERS = {
	'User-Agent':
		'Mozilla/5.0 (compatible; eMehedințiFeedReader/1.0; +https://emehedinti.ro)',
	Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
};

async function fetchFeedXml(url, timeoutMs = 25000) {
	const ac = new AbortController();
	const timer = setTimeout(() => ac.abort(), timeoutMs);
	try {
		const res = await fetch(url, {
			method: 'GET',
			headers: HEADERS,
			signal: ac.signal,
			redirect: 'follow',
		});
		if (!res.ok) {
			throw new Error(`HTTP ${res.status}`);
		}
		const text = await res.text();
		if (!text || text.length < 80) {
			throw new Error('empty feed body');
		}
		return text;
	} finally {
		clearTimeout(timer);
	}
}

function itemsFromSettled(result) {
	if (!result || result.status !== 'fulfilled' || !result.value?.items?.length) {
		return [];
	}
	return result.value.items;
}

/**
 * Partner homepage feeds. Uses global fetch + parseString so it works on
 * Cloudflare Workers / OpenNext (rss-parser parseURL uses Node http and fails there).
 */
export async function fetchPartnerSitemaps() {
	const settled = await Promise.allSettled(
		FEED_URLS.map(async (url) => {
			const xml = await fetchFeedXml(url);
			const parser = new Parser();
			return parser.parseString(xml);
		})
	);

	return {
		obliq: itemsFromSettled(settled[0]).slice(0, 6),
		mm: itemsFromSettled(settled[1]).slice(0, 6),
		legal: itemsFromSettled(settled[2]).slice(0, 6),
		sanatate: itemsFromSettled(settled[3]).slice(0, 6),
		gospodar: itemsFromSettled(settled[4]).slice(0, 6),
		azi: itemsFromSettled(settled[5]).slice(0, 6),
		cm: itemsFromSettled(settled[6]).slice(0, 6),
		pc: itemsFromSettled(settled[7]).slice(0, 10),
	};
}
