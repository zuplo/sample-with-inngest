import { ZuploContext, ZuploRequest, Logger, environment } from "@zuplo/runtime";
import { Inngest } from "inngest";
// @ts-ignore
import { serve } from "inngest/edge";



export default async function (request: ZuploRequest, context: ZuploContext) {
  const deploymentName = new URL(request.url).host.split(".")[0];
  const inngest = new Inngest({
    name: "My Project",
    env: deploymentName === "with-inngest-main-1e1a5a5" ? undefined : deploymentName,
    eventKey: environment.INNGEST_EVENT_KEY,
    logger: context.log,
  });

  const helloWorld = inngest.createFunction(
    { name: "Hello World" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
      await step.sleep("1s");
      return { event, body: "Hello, World!" };
    }
  );

  const handler = serve(inngest, [helloWorld], {
    logLevel: environment.ZUPLO_LOG_LEVEL,
    signingKey: environment.INNGEST_SIGNING_KEY,
  });
  return handler(request, context)
}