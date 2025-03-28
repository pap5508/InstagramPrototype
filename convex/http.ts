import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebHook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx: any, request: any) => {
        const webHookSecret = process.env.CLERK_WEBHOOK_SECRET;
        if (!webHookSecret) {
            throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
        }

        const svid_id = request.header.get("svid-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svid_id || svix_signature || svix_timestamp) {
            return new Response("Error occured no svix headers ", {
                status: 400
            })
        }
        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new WebHook(webHookSecret);
        let env: any;

        try {

        } catch (error) {

        }
    })
})