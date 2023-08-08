import { ZuploContext, ZuploRequest, environment } from "@zuplo/runtime";
import { Inngest, EventSchemas } from "inngest";
// @ts-ignore
import { serve } from "inngest/edge";
import sgMail from "@sendgrid/mail";

type UserSignup = {
  data: {
    email: string;
    name: string;
  };
};
type Events = {
  "user/new.signup": UserSignup;
};

export default async function (request: ZuploRequest, context: ZuploContext) {
  const inngest = new Inngest({
    name: "My Project",
    env: environment.ZUPLO_ENVIRONMENT_TYPE,
    eventKey: environment.INNGEST_EVENT_KEY,
    logger: context.log,
    schemas: new EventSchemas().fromRecord<Events>(),
  });

  const userSignup = inngest.createFunction(
    { name: "Onboarding flow" },
    { event: "event/user.created" },
    async ({ event, step }) => {
      await step("send email", async () => {
        sgMail.setApiKey(environment.SENDGRID_API_KEY);
        const msg = {
          to: event.data.email,
          from: "hello@mycompany.com",
          subject: "Here's your welcome email",
          text: "Welcome to my ACME's API service!",
          html: "<strong>Welcome to my ACME's API service!</strong>",
        };

        await sgMail.send(msg);
        return { event, body: "Hello, World!" };
      });

      await step();
    }
  );

  const handler = serve(inngest, [userSignup], {
    logLevel: environment.ZUPLO_LOG_LEVEL,
    signingKey: environment.INNGEST_SIGNING_KEY,
  });

  return handler(request, context);
}
