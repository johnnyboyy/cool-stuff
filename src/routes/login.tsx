import { createSession, signIn, signOut } from "@solid-mediakit/auth/client";
import { Show, createSignal } from "solid-js";
import { UncontrolledField } from "~/components/Field";

export default function Home() {
	const session = createSession();
	const [isEmailSent, setIsEmailSent] = createSignal(false);

	return (
		<main>
			<h1>Login</h1>
			<Show
				when={session()}
				fallback={
					<>
						<span>You are not signed in.</span>
						<form
							class="standard"
							onSubmit={async (event: Event) => {
								event.preventDefault();
								const formData = new FormData(event.target as HTMLFormElement);

								await signIn("resend", { email: formData.get("email") });

								setIsEmailSent(true);
							}}>
							<UncontrolledField name="email" label="Email" helperText="Enter your email" />
							<button type="submit">Signin with Resend</button>
						</form>
					</>
				}>
				<h2>You are signed in</h2>
				<button
					onClick={() => {
						signOut();
					}}>
					Sign out
				</button>
			</Show>
			<Show when={isEmailSent()}>
				<span>Email sent</span>
			</Show>
		</main>
	);
}
