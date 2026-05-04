import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const insertSelectedAssistants = mutation({
  args: {
    uid: v.id("users"),
    records: v.any(),
  },
  handler: async (ctx, args) => {
    const insertedIds = await Promise.all(
      args.records.map(
        async (record: any) =>
          await ctx.db.insert("assistants", {
            ...record,
            aiModelId: "Google: Gemini 2.0 Flash",
            uid: args.uid,
          }),
      ),
    );
    return insertedIds;
  },
});

export const getAllAssistants = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("assistants")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .collect();
    return result;
  },
});

export const updateAssistant = mutation({
  args: {
    id: v.id("assistants"),
    userInstruction: v.string(),
    aiModelId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.id, {
      aiModelId: args.aiModelId,
      userInstruction: args.userInstruction,
    });

    return result;
  },
});

export const deleteAssistant = mutation({
  args: {
    id: v.id("assistants"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.delete(args.id);
    return result;
  },
});
