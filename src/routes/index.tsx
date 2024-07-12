import { createSignal } from "solid-js";
import { createAsync } from "@solidjs/router";
import { api } from "~/lib/api";

function Index() {
	const [count, setCount] = createSignal(0);
	const hello = createAsync(() => api.example.hello.query("world"));

	return (
		<>
			<h1>Hello world!</h1>
			<button
				class="increment"
				onClick={() => {
					setCount(count() + 1);
				}}
				type="button">
				Clicks: {count()}
			</button>
			<p>
				Visit{" "}
				<a href="https://start.solidjs.com" target="_blank">
					start.solidjs.com
				</a>{" "}
				to learn how to build SolidStart apps.
			</p>
			<pre>
				<code>{JSON.stringify(hello(), null, 2)}</code>
			</pre>
		</>
	);
}

export default Index;
