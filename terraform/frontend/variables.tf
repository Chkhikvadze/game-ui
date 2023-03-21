/*
 * Generic variables required for the module
 *
 */
variable "unique_id" {
  type        = string
  description = "The regional naming of the backend this module will create. Usually this will be the subdomain of the app."
}
variable "aws_default_region" {
  type        = string
  description = "The default region used in this module, as it is cloudfront related, usually us-east-1"
  default     = "us-east-1"
}
variable "environment" {
  type        = string
  description = "The environment this module is being deployed to"
  default     = "None"
}
variable "tags" {
  type        = map(string)
  description = "Tags to apply to all resources that support them"
  default     = {}
}

/*
 * Specific variables required for the module
 *
 */
variable "interface_url" {
  type        = string
  description = "The url of the web interface"
}
variable "alternate_interface_url" {
  type        = string
  description = "alternate URL for the web interface"
  default     = ""
}
variable "web_acl_name" {
  type        = string
  description = "The name of WAF to attch this CloudFront"
  default     = "CloudfrontGlobalWAF"
}
variable "acm_cert_arn_clf" {
  type        = string
  description = "The cert for Cloudfront"
  default     = "arn:aws:acm:us-east-1:697083454028:certificate/f8be152b-93c8-4f20-a93b-fd14bcc9d361"
}
variable "ssl_protocol_version" {
  type        = string
  description = "the TLS policy to use on the HTTPS listener. The default is TLSv1.2_2018 which contains some weaker algorithms, suggested to use TLSv1.2_2021."
  default     = "TLSv1.2_2021"
}

# /**
#  * to add security headers.
#  */
# variable "security_header_params" {
#   type = map(string)
#   default = {
#     frame_options = "SAMEORIGIN"
#     csp_report_only = true
#     csp_policy  = <<-CSP
#           default-src 'self';
#           script-src 'self';
#           connect-src 'self';
#           img-src 'self' data:;
#           font-src  'self' https://fonts.gstatic.com https://stackpath.bootstrapcdn.com https://fonts.googleapis.com;
#           style-src 'self' 'unsafe-inline' https://stackpath.bootstrapcdn.com https://fonts.googleapis.com;
#           CSP
#   }
# }
