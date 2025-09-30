# Ibis Equity Consulting, LLC — Angular Starter

This scaffold provides a mobile-first Angular application with Angular Material and PWA basics. It includes instructions to build and host on AWS (S3 + CloudFront) or using AWS Amplify.

Getting started

- Node.js (18+) and npm installed
- From the project root:

```powershell
npm install
npm start
```

Build for production

```powershell
npm run build
```

Verify production build locally

```powershell
npm run build
npm run serve:prod
# then open http://localhost:5000 to sanity-check the production build
```

Deploy to AWS S3 + CloudFront (static site)

1. Build the app: `npm run build` (dist will contain the files)
2. Create an S3 bucket configured for static hosting and upload the contents of `dist/ibis-equity-consulting-llc`.
3. Create a CloudFront distribution pointing to the S3 bucket (enable default root object `index.html`, set proper caching and invalidation when deploying updates).
4. Optionally set up an ACM certificate and configure alternate domain name.

Automated deploy (PowerShell)

```powershell
# From project root after build
.\scripts\deploy-to-s3.ps1 -BucketName your-bucket-name -DistributionId YOUR_CLOUDFRONT_ID
```

GitHub Actions deploy (example)

```yaml
# Add a job to your .github/workflows/ci.yml to deploy on push to main
## - name: Deploy
##   if: github.ref == 'refs/heads/main'
##   run: |
##     npm ci
##     npm run build
##     aws s3 sync dist/ibis-equity-consulting-llc s3://$BUCKET --delete --acl public-read
```

Quick Amplify deploy

1. Install and configure Amplify CLI or use the Amplify console in AWS.
2. Connect the repository and set build command `npm ci && npm run build` and publish directory `dist/ibis-equity-consulting-llc`.

Next steps

- Replace placeholder icons and favicon in `src/assets/icons` and `src/favicon.ico`.
- Add authentication, APIs, and environment variables for production.
 
Landing page behavior

- The app shows a landing animation (GIF) on first load. It will automatically hide after 30 seconds.
- Users can click the landing area or the "Skip" button to immediately proceed to the main page.
- There's a "Don't show again" checkbox; if checked the choice is saved to `localStorage` and the landing will be skipped on future visits.
- To change the landing asset, replace `src/assets/landing.gif` with your GIF (keep the filename or update `landing.component.ts` src path).
