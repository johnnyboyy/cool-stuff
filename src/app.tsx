// @refresh reload
import { SessionProvider } from "@solid-mediakit/auth/client";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import "./app.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>SolidStart - Basic</Title>
					<Suspense>
						<SessionProvider>
							<Header />
							<Content>{props.children}</Content>
						</SessionProvider>
					</Suspense>
				</MetaProvider>
			)}>
			<FileRoutes />
		</Router>
	);
}
