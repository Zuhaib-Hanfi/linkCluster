"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { LinkFormData } from "../components/link-form";

export const CreateLinkByUser = async (data: LinkFormData) => {
    const user = await currentUser();
    if (!user) return { success: false, error: "No Authenticated User Found" };
    const link = await db.link.create({
        data: {
            title: data.title,
            url: data.url,
            description: data.description,
            clickCount: 0,
            user: {
                connect: {
                    clerkId: user.id
                }
            }
        }
    })

    return {
        success: true,
        message: "link created Successfully",
        data: link
    }
}

export const getAllLinkForUser = async () => {
    const user = await currentUser()
    const links = await db.link.findMany({
        where: {
            user: {
                clerkId: user?.id
            }
        },
        select: {
            id: true,
            title: true,
            description: true,
            url: true,
            clickCount: true,
            createdAt: true,
        }
    })
    return{
        success:true,
        message:"Got all Links Successfully",
        data:links
    }
}