import { createSession, signOut } from "@solid-mediakit/auth/client";
import { Menu } from "@ark-ui/solid";
import { Show } from "solid-js";
import "./Header.css";

import { Avatar } from "~/components/Avatar";

const Header = () => {
	const session = createSession();

	return (
		<header class="header">
			<div class="logo">My SolidJS App</div>
			<nav>
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/about">**About</a>
					</li>
					<li>
						<a href="/contact">**Contact</a>
					</li>
				</ul>
			</nav>
			<div class="user-section">
				<Show
					when={session()}
					fallback={
						<a class="button outline" href="/login">
							Login
						</a>
					}>
					<Menu.Root>
						<Menu.Trigger class="unstyled">
							<Avatar user={session()?.user} />
						</Menu.Trigger>
						<Menu.Positioner>
							<Menu.Content>
								<Menu.Item
									value="edit profile"
									asChild={(parentProps) => (
										<a {...parentProps} href="/profile">
											Edit Profile
										</a>
									)}
								/>
								<Menu.Item
									value="log out"
									asChild={(parentProps) => (
										<button
											{...parentProps}
											class="unstyled"
											onClick={(event) => {
												event.preventDefault();
												signOut();
											}}>
											Log out
										</button>
									)}
								/>
							</Menu.Content>
						</Menu.Positioner>
					</Menu.Root>
				</Show>
			</div>
		</header>
	);
};

export { Header };
