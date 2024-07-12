import { createResource, Show } from "solid-js";
import { Avatar as ArkAvatar } from "@ark-ui/solid";
import { CircleUserRound } from "lucide-solid";
import type { User } from "@solid-mediakit/auth";
import "./Avatar.css";

function getInitials(name: User["name"]) {
	if (name === undefined || name === null) {
		return undefined;
	} else {
		return name
			.split(" ")
			.slice(0, 2)
			.map(([firstLetter]) => firstLetter)
			.join("")
			.toUpperCase();
	}
}

// async function emailToSHA256(email: string) {
// 	const normalizedEmail = email.trim().toLowerCase();

// 	const encoder = new TextEncoder();
// 	const data = encoder.encode(normalizedEmail);

// 	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

// 	const hashArray = Array.from(new Uint8Array(hashBuffer));
// 	const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

// 	return hashHex;
// }

// async function getGravatarURL(email: User["email"]): Promise<string | undefined> {
// 	if (email === undefined || email === null) {
// 		return undefined;
// 	} else {
// 		const hash = await emailToSHA256(email);
// 		return `https://gravatar.com/avatar/${encodeURIComponent(hash)}`;
// 	}
// }

function Avatar({
	user,
	width = 40,
	height = 40,
}: {
	user: User | undefined;
	width?: number;
	height?: number;
}) {
	// const [gravatarURL] = createResource(user?.email, getGravatarURL);

	return (
		<ArkAvatar.Root style={{ width: `${width}px`, height: `${height}px` }}>
			<ArkAvatar.Fallback>
				<Show when={user?.name} fallback={<CircleUserRound size={width} />}>
					{getInitials(user?.name)}
				</Show>
			</ArkAvatar.Fallback>
			{/* <ArkAvatar.Image src={user?.image ?? gravatarURL()} alt="avatar" /> */}
			<ArkAvatar.Image src={user?.image ?? undefined} alt="avatar" />
		</ArkAvatar.Root>
	);
}

export { Avatar };
