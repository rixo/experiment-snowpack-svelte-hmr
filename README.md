# Snowpack + Svelte HMR

**Status:** ~~a glance into the future.~~ **2020-09-22** Now using stock Snowpack and `svelte-hmr`. Probably headed to become a proper plugin soon.

Copy paste into your terminal:

```bash
git clone git@github.com:rixo/experiment-snowpack-svelte-hmr.git
cd experiment-snowpack-svelte-hmr
yarn
yarn start
```

Watch as 99 \* 5 components are being live compiled by Snowpack and loaded into your browser (have dev tools' network tab open for best experience).

Reload. Faster, right? Snowpack dev server caches built files, and nothing has changed since last time.

Open random Svelte component in IDE. (Just be sure that's a component that is currently rendered into the browser...)

Edit.

_Have tissues ready\*._

Save.

Yup.

This was HMR (when minimal rebuild time).

You didn't even see what happened, did you? Do it again ;)

_\* for your eyes, you perv!_
