// @refresh reload
import { SessionProvider } from "@solid-mediakit/auth/client";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, ErrorBoundary } from "solid-js";
import { Header } from "./components/Header";
import "./app.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>SolidStart - Basic</Title>
					<Suspense>
						<SessionProvider>
							<ErrorBoundary
								fallback={(error) => (
									<div class="error">
										<h2>Something went wrong</h2>
										<pre>{error.message}</pre>
									</div>
								)}>
								<Header />
								<main>{props.children}</main>
							</ErrorBoundary>
						</SessionProvider>
					</Suspense>
				</MetaProvider>
			)}>
			<FileRoutes />
		</Router>
	);
}
