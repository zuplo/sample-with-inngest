import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";
import { inngest } from "./inngest";

export default async function (request: ZuploRequest, context: ZuploContext) {
  // Send your event payload to Inngest
  await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testFromNext@example.com",
    },
  });
}