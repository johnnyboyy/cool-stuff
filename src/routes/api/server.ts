"use server";
import { redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";
import { eq } from "drizzle-orm";

import { Users, db } from "@/schema";

async function login(email: string) {
	const user = db.select().from(Users).where(eq(Users.email, email)).get();

	if (!user) {
		throw new Error("Invalid login");
	} else {
		return user;
	}
}

function getSession() {
	return useSession({
		password: process.env.SESSION_SECRET ?? "5553c592f918637ba02b8b1083fc77be",
	});
}

export async function loginOrRegister(formData: FormData) {
	const email = String(formData.get("email"));

	try {
		const user = await login(email);
		const session = await getSession();
		await session.update((sessionData) => {
			sessionData.userId = user.id;
		});
	} catch (err) {
		return err as Error;
	}

	throw redirect("/");
}

export async function logout() {
	const session = await getSession();
	await session.update((sessionData) => {
		sessionData.userId = undefined;
	});

	throw redirect("/login");
}

export async function getUser() {
	const session = await getSession();
	const userId = session.data.userId;

	if (userId === undefined) {
		throw redirect("/login");
	} else {
		try {
			const user = db.select().from(Users).where(eq(Users.id, userId)).get();

			if (!user) {
				throw redirect("/login");
			} else {
				return { id: user.id, email: user.email };
			}
		} catch {
			throw logout();
		}
	}
}
