import { useState } from 'react';
import { subscribeNewsletter } from '../../lib/newsletter-api';

const GillionNewsletterForm = ({ dark = false, source = 'ui', note }) => {
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('idle');
	const [message, setMessage] = useState('');

	const formClass = dark
		? 'gillion-newsletter gillion-newsletter--dark'
		: 'gillion-newsletter';
	const noteClass = dark
		? 'gillion-newsletter__note gillion-newsletter__note--dark'
		: 'gillion-newsletter__note';

	const handleSubmit = async (e) => {
		e.preventDefault();
		const trimmed = email.trim();
		if (!trimmed) {
			setStatus('error');
			setMessage('Introdu adresa de email.');
			return;
		}

		setStatus('loading');
		setMessage('');

		try {
			const data = await subscribeNewsletter({ email: trimmed, source });
			setStatus('success');
			setMessage(
				data.already_subscribed
					? 'Ești deja abonat la newsletter.'
					: 'Te-ai abonat cu succes. Verifică inbox-ul.',
			);
			setEmail('');
		} catch (err) {
			setStatus('error');
			setMessage(err.message || 'A apărut o eroare. Încearcă din nou.');
		}
	};

	return (
		<>
			<form className={formClass} onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Adresa ta de email"
					aria-label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={status === 'loading'}
					required
				/>
				<button
					type="submit"
					aria-label="Trimite"
					disabled={status === 'loading'}
				>
					<i className="feather icon-send" />
				</button>
			</form>
			{note && <p className={noteClass}>{note}</p>}
			{message && (
				<p
					className={`${noteClass} gillion-newsletter__feedback gillion-newsletter__feedback--${status}`}
					role="status"
				>
					{message}
				</p>
			)}
		</>
	);
};

export default GillionNewsletterForm;
