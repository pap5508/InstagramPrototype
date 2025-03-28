import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        image: v.string(),
        followers: v.number(),
        following: v.number(),
        posts: v.number(),
        clerkId: v.string()
    }).index("by_clerk_id", ["clerkId"]),  //getUserByClerkId

    posts: defineTable({
        userId: v.id("users"),
        imageUrl: v.string(),
        storageId: v.id("_storage"), // will be needed to delete a post
        caption: v.string(),
        likes: v.number(),
        comments: v.number(),
    }).index("by_user", ["userId"]),  //get post by useid

    likes: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
    }).index("by_post", ["postId"]).index("by_user_and_post", ["userId", "postId"]),

    comments: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
        content: v.string(),
    }).index("by_user", ["postId"]),  //get comment by postId

    follows: defineTable({
        followerId: v.id("users"),
        follwoingId: v.id("users"),
    }).index("by_follower", ["followerId"])
        .index("by_following", ["follwoingId"])
        .index("by_both", ["followerId", "follwoingId"]),

    notification: defineTable({
        receiverId: v.id("users"),
        senderId: v.id("users"),
        type: (v.literal("like"), v.literal("comment"), v.literal("follow")),
        postId: (v.id("posts")),
        commentId: v.id("comments")
    }).index("by_receiver", ["receiverId"]),

    bookmarks: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
    }).index("by_user", ["userId"])
        .index("by_post", ["postId"])
        .index("by_user_and_post", ["userId", "postId"])
});