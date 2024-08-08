import { createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { api } from "~/lib/api";

function Index() {
	const [count, setCount] = createSignal(0);
	const hello = createAsync(() => api.example.hello.query("world"));

	return (
		<div class="container" style="max-width: 800px;row-gap: 1rem;">
			<div class="row">
				<h1>Hello world!</h1>
			</div>
			<div class="row">
				<div>
					<button
						class="increment"
						onClick={() => {
							setCount(count() + 1);
						}}
						type="button">
						Clicks: {count()}
					</button>
				</div>
			</div>
			<div class="row">
				<p>
					Visit{" "}
					<a href="https://start.solidjs.com" target="_blank">
						start.solidjs.com
					</a>{" "}
					to learn how to build SolidStart apps.
				</p>
			</div>
			<div class="row">
				<pre>
					<code>{JSON.stringify(hello(), null, 2)}</code>
				</pre>
			</div>
		</div>
	);
}

export default Index;
