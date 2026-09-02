import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuData from "../../data/menu/HeaderMenu.json";

const HeaderOne = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			<header className="page-header gillion-header">
				<div className="gillion-header__inner">
					<Link href="/" className="gillion-logo">
						<Image src="/images/cropped_image.png" alt="Azi în Drobeta‑Turnu Severin" width={48} height={48} />
						<div className="gillion-logo__text">
							<span className="gillion-logo__name">Azi în Drobeta‑Turnu Severin</span>
							<span className="gillion-logo__tag">Știri locale din Drobeta‑Turnu Severin</span>
						</div>
					</Link>

					<ul className="gillion-nav">
						{MenuData.map((item, index) => (
							<li key={index}>
								<Link href={item.path}>{item.label}</Link>
							</li>
						))}
					</ul>

					<div className="gillion-header__actions">
						<button
							type="button"
							className="gillion-mobile-toggle"
							onClick={() => setMobileOpen(true)}
							aria-label="Deschide meniul"
							aria-expanded={mobileOpen}
						>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</header>

			<div
				className={`gillion-mobile-menu ${mobileOpen ? "open" : ""}`}
				onClick={() => setMobileOpen(false)}
				aria-hidden={!mobileOpen}
			>
				<div className="gillion-mobile-menu__panel" onClick={(e) => e.stopPropagation()}>
					<button
						type="button"
						className="gillion-mobile-menu__close"
						onClick={() => setMobileOpen(false)}
						aria-label="Închide meniul"
					>
						×
					</button>
					<ul>
						{MenuData.map((item, index) => (
							<li key={index}>
								<Link href={item.path} onClick={() => setMobileOpen(false)}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default HeaderOne;
