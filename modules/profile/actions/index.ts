"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { getAvailableUsernameSuggestions } from "../utils";

export const checkProfileUsernameAvailability = async (username: string) => {
    if (!username) return { availabe: false, suggestions: [] }

    const user = await db.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) {
        return { available: true };
    }

    const suggestions = await getAvailableUsernameSuggestions(username, 3, 10)

    return {
        available: false,
        suggestions
    }
};

export const claimUsername = async (username: string) => {
    const loggedInUser = await currentUser();
    if (!loggedInUser) return {
        success: false, error: "No Authenticated User Found"
    }
    const user = await db.user.update({
        where: {
            clerkId: loggedInUser.id
        },
        data: {
            username: username
        }
    })
    if (!user) return { success: false, error: "No Authenticated User Found" };
    return { success: true };
}