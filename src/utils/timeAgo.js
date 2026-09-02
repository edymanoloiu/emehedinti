import { DateTime } from 'luxon';

const timeAgo = (dateStr) => {
	if (!dateStr) return '';
	const date = DateTime.fromFormat(dateStr, 'LLL dd yyyy');
	if (!date.isValid) {
		const fallback = DateTime.fromJSDate(new Date(dateStr));
		if (!fallback.isValid) return '';
		return formatRelative(fallback);
	}
	return formatRelative(date);
};

const formatRelative = (date) => {
	const now = DateTime.now();
	const diff = now.diff(date, ['years', 'months', 'days', 'hours']).toObject();

	if (diff.years >= 1) {
		const n = Math.floor(diff.years);
		return n === 1 ? 'acum 1 an' : `acum ${n} ani`;
	}
	if (diff.months >= 1) {
		const n = Math.floor(diff.months);
		return n === 1 ? 'acum 1 lună' : `acum ${n} luni`;
	}
	if (diff.days >= 1) {
		const n = Math.floor(diff.days);
		return n === 1 ? 'acum 1 zi' : `acum ${n} zile`;
	}
	return 'recent';
};

const readTime = (text) => {
	const words = (text || '').split(/\s+/).filter(Boolean).length;
	const mins = Math.max(1, Math.ceil(words / 200));
	return `${mins} min citire`;
};

export { timeAgo, readTime };
