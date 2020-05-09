# Snowpack + Svelte HMR

**Status:** a glance into the future.

Copy paste into your terminal:

```bash
git clone git@github.com:rixo/experiment-snowpack-svelte-hmr.git
cd experiment-snowpack-svelte-hmr
yarn
yarn start
```

Open in your browser: http://localhost:3000

Watch 99 \* 5 components being live compiled by Snowpack and loaded into your browser (have dev tools open for best experience).

Reload. Faster, right? Snowpack dev server caches built files, and nothing has changed since last time.

Open random Svelte component in IDE.

Edit.

_Have tissues ready\*._

Save.

Yup.

This was HMR (when minimal rebuild time).

You didn't even see what happened, did you? Do it again ;)

_\* for your eyes, you perv!_
