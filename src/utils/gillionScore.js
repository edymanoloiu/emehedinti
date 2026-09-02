/** Stable pseudo-rating for Gillion-style score badges (6.0–9.9). */
export function postScore(slug = "") {
	let hash = 0;
	for (let i = 0; i < slug.length; i += 1) {
		hash = (hash + slug.charCodeAt(i) * (i + 1)) % 997;
	}
	return (6 + (hash % 35) / 10).toFixed(1);
}
