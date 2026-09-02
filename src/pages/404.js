import Head from "next/head";
import HeaderOne from "../components/header/HeaderOne";
import FooterOne from "../components/footer/FooterOne";

export default function Custom404() {
	return (
		<>
			<Head>
				<title>Pagina nu a fost găsită - emehedinti.ro</title>
				<meta
					name="description"
					content="Pagina pe care o cauți nu există sau a fost mutată."
				/>
			</Head>

			<HeaderOne />

			<main className="container" style={{ padding: "4rem 0" }}>
				<h1>404 - Pagina nu a fost găsită</h1>
				<p>
					Ne pare rău, dar pagina pe care încerci să o accesezi nu există sau a
					fost mutată.
				</p>
				<p>
					<a href="/">Înapoi la prima pagină</a>
				</p>
			</main>

			<FooterOne />
		</>
	);
}