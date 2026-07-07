# ZonasAI
Help with inquiries 

Owner: McDonald Zonas

Maintainer: McDonald Zonas — examples and TypeScript setup added.

**Deploying to Render**

1. Go to https://render.com and create or sign into your account.
2. Connect your GitHub account and choose the repository `zonaskmcdonald-oss/ZonasAI`.
3. When creating a new Web Service, select the `main` branch. Render will detect Node and run `npm start`.
4. Alternatively you can enable automatic deploys; this repo includes `render.yaml` so Render can create the service from the manifest.

After deployment the web app will be available at the URL Render provides. Use `/run?lang=python&name=Alice` etc. to run examples.

Installing on mobile (PWA)

1. Deploy or run the server (`npm install && npm start`) and open the site on your phone's browser.
2. Android (Chrome): open the site, then use the menu → "Add to Home screen". The app will launch in standalone mode.
3. iOS (Safari): open the site, tap the Share button → "Add to Home Screen" (note: iOS has limited PWA support; service worker features are limited).

