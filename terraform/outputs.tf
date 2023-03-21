output "aws_s3_bucket_name" {
  description = "The S3 bucket that the ui is served from"
  value       = module.frontend.aws_s3_bucket_name
}
output "cloudfront_dns" {
  description = "The DNS name of the CloudFront distribution"
  value       = module.frontend.cloudfront_dns
}