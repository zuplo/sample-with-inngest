import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";

export default async function (request: ZuploRequest, context: ZuploContext) {
  const inngest = new Inngest({
    name: "My Project",
    env: environment.ZUPLO_ENVIRONMENT_TYPE,
    eventKey: environment.INNGEST_EVENT_KEY,
  });

  // Send your event payload to Inngest
  await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testFromNext@example.com",
    },
  });
}