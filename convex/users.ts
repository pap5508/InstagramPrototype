import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        image: v.string(),
        clerkId: v.string()
    },
    handler: async (ctx: any, args: any) => {
        const exisitingUser = await ctx.db.query("users")
            .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", args.clerkId))
            .first()
        if (exisitingUser) {
            return;
        }
        await ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            image: args.image,
            clerkId: args.clerkId,
            followers: 0,
            following: 0,
            posts: 0
        })
    }

});