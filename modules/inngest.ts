import { ZuploContext, ZuploRequest, Logger, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";
// @ts-ignore
import { serve } from "inngest/edge";

const name = "My Project"

export const inngest = new Inngest({
  name,
  eventKey: environment.INNGEST_EVENT_KEY,
});

const helloWorld = inngest.createFunction(
  { name: "Hello World" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("1s");
    return { event, body: "Hello, World!" };
  }
);

export default async function (request: ZuploRequest, context: ZuploContext) {
  const inngest = new Inngest({
    name,
    eventKey: environment.INNGEST_EVENT_KEY,
    logger: context.log,
  });

  const handler = serve(inngest, [helloWorld], {
    logLevel: environment.ZUPLO_LOG_LEVEL,
    signingKey: environment.INNGEST_SIGNING_KEY,
  });
  return handler(request, context)
}