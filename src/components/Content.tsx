import { splitProps } from "solid-js";
import type { JSX } from "solid-js";
import "./Content.css";

function Content(props: JSX.IntrinsicElements["main"]) {
	const [local, others] = splitProps(props, ["children"]);
	return (
		<main {...others}>
			{local.children}
		</main>
	);
}

export { Content };
