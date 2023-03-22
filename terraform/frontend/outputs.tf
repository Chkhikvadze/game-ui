// ARN of the lambda function with the most recently built version attached.
output "unique_id" {
  value = var.unique_id
}

output "cloudfront_dns" {
  description = "The endpoint that the ui is served on - for DNS CNAME update"
  value       = aws_cloudfront_distribution.interface.domain_name
}

output "cloudfront_zone_id" {
  description = "The endpoint that the ui is served on - for DNS CNAME update"
  value       = aws_cloudfront_distribution.interface.hosted_zone_id
}

output "aws_s3_bucket_name" {
  description = "The S3 bucket that the ui is served from"
  value       = aws_s3_bucket.interface_url.bucket
}