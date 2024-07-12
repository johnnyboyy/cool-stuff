import { Show } from "solid-js";
import { createSession, signIn, signOut } from "@solid-mediakit/auth/client";
import { UncontrolledField } from "~/components/Field";

function MagicLink() {
	return (
		<form
			class="standard"
			onSubmit={async (event: Event) => {
				event.preventDefault();
				const formData = new FormData(event.target as HTMLFormElement);

				await signIn("resend", { email: formData.get("email") });
			}}>
			<UncontrolledField name="email" label="Email" helperText="Enter your email" />
			<button type="submit">Signin with Resend</button>
		</form>
	);
}

export default function Home() {
	const session = createSession();

	return (
		<>
			<h1>Login</h1>
			<Show
				when={session()}
				fallback={
					<div>
						<h2>Options: </h2>
						<MagicLink />
					</div>
				}>
				<h2>You are signed in</h2>
				<button
					onClick={() => {
						signOut();
					}}>
					Sign out
				</button>
			</Show>
		</>
	);
}
