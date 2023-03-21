# AWS Terraform Frontend Module

This is the module for the UI setup we use for terafrom. It consists of the following itmes:

## Cloudfront Function CSP Module

NOTE: should use [Header Polcies?](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/creating-response-headers-policies.html)
TODO: Requires a way to inject CSP at build time 


<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 0.13 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 3.25 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 3.75.2 |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_cloudfront_distribution.interface](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_distribution) | resource |
| [aws_cloudfront_origin_access_identity.origin_access_identity](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_origin_access_identity) | resource |
| [aws_cloudfront_response_headers_policy.security_headers_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudfront_response_headers_policy) | resource |
| [aws_s3_bucket.interface_url](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket) | resource |
| [aws_s3_bucket_acl.interface_url](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl) | resource |
| [aws_s3_bucket_policy.interface_url](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_policy) | resource |
| [aws_wafv2_web_acl.enviroment](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/wafv2_web_acl) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_acm_cert_arn_clf"></a> [acm\_cert\_arn\_clf](#input\_acm\_cert\_arn\_clf) | The cert for Cloudfront | `string` | `"arn:aws:acm:us-east-1:697083454028:certificate/f8be152b-93c8-4f20-a93b-fd14bcc9d361"` | no |
| <a name="input_alternate_interface_url"></a> [alternate\_interface\_url](#input\_alternate\_interface\_url) | alternate URL for the web interface | `string` | `""` | no |
| <a name="input_aws_default_region"></a> [aws\_default\_region](#input\_aws\_default\_region) | The default region used in this module, as it is cloudfront related, usually us-east-1 | `string` | `"us-east-1"` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | The environment this module is being deployed to | `string` | `"None"` | no |
| <a name="input_interface_url"></a> [interface\_url](#input\_interface\_url) | The url of the web interface | `string` | n/a | yes |
| <a name="input_ssl_protocol_version"></a> [ssl\_protocol\_version](#input\_ssl\_protocol\_version) | the TLS policy to use on the HTTPS listener. The default is TLSv1.2\_2018 which contains some weaker algorithms, suggested to use TLSv1.2\_2021. | `string` | `"TLSv1.2_2021"` | no |
| <a name="input_tags"></a> [tags](#input\_tags) | Tags to apply to all resources that support them | `map(string)` | `{}` | no |
| <a name="input_unique_id"></a> [unique\_id](#input\_unique\_id) | The regional naming of the backend this module will create. Usually this will be the subdomain of the app. | `string` | n/a | yes |
| <a name="input_web_acl_name"></a> [web\_acl\_name](#input\_web\_acl\_name) | The name of WAF to attch this CloudFront | `string` | `"CloudfrontGlobalWAF"` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_aws_s3_bucket_name"></a> [aws\_s3\_bucket\_name](#output\_aws\_s3\_bucket\_name) | The S3 bucket that the ui is served from |
| <a name="output_cloudfront_dns"></a> [cloudfront\_dns](#output\_cloudfront\_dns) | The endpoint that the ui is served on - for DNS CNAME update |
| <a name="output_cloudfront_zone_id"></a> [cloudfront\_zone\_id](#output\_cloudfront\_zone\_id) | The endpoint that the ui is served on - for DNS CNAME update |
| <a name="output_unique_id"></a> [unique\_id](#output\_unique\_id) | ARN of the lambda function with the most recently built version attached. |
<!-- END_TF_DOCS -->
