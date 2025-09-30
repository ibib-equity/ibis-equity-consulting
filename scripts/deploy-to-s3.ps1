param(
  [string]$BucketName,
  [string]$DistributionId
)

if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
  Write-Error "AWS CLI not found. Install and configure AWS CLI first."
  exit 1
}

if (-not $BucketName) {
  Write-Error "BucketName parameter is required. Example: .\deploy-to-s3.ps1 -BucketName my-bucket -DistributionId ABCD1234"
  exit 1
}

$dist = Join-Path -Path (Get-Location) -ChildPath "dist/ibis-equity-consulting-llc"
if (-not (Test-Path $dist)) {
  Write-Error "Build output not found. Run `npm run build` first."
  exit 1
}

Write-Output "Syncing $dist to s3://$BucketName ..."
aws s3 sync $dist "s3://$BucketName" --delete --acl public-read

if ($DistributionId) {
  Write-Output "Creating CloudFront invalidation for $DistributionId"
  aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
}

Write-Output "Deploy complete."
