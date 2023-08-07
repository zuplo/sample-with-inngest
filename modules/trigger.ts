import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";

export default async function (request: ZuploRequest, context: ZuploContext) {
  context.log.debug("hello")
  const inngest = new Inngest({
    name: "My Project",
    env: environment.INNGEST_ENV,
    eventKey: "jt4Fi1GZISjIKN9OvRiyGcHlRshuH_Fyu1j0k8Bk5TAzdWjTGZgsrNaSgaXAoOLpmurkPm4ApzsuNb4RFwTjlQ",
    logger: context.log,
  });

  // Send your event payload to Inngest
  await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testFromNext@example.com",
    },
  });
}