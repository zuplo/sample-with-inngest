# Zuplo with Inngest

To use this sample, you must set two environment variables. Both of which you can find on your Inngest dashboard.

- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`

Currently, the Inngest environment is set to the environment variable `ZUPLO_ENVIRONMENT_TYPE` which set set to the following values:

- `WORKING_COPY` - When running on `zuplo.dev`
- `PREVIEW` - When deployed to any non-production branch on `zuplo.app`
- `PRODUCTION` - When deployed from your default git branch to `zuplo.app` or a custom domain

[![Foo](https://cdn.zuplo.com/www/zupit.svg)](http://portal.zuplo.com/zup-it?sourceRepoUrl=https://github.com/zuplo/samples-with-inngest.git)
