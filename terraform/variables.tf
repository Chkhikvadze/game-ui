variable "unique_id" {
  type        = string
  description = "The unique id for the deployment"
  default = "routeone"
}
variable "product" {
  type        = string
  description = "The product being deployed"
  default = "routeone bus calculator"
}
variable "deployment_domain" {
  type        = string
  description = "The apex domain name for the deployment"
  default     = "betterfleet.com"
}
variable "environment" {
  type        = string
  description = "The environment description to deploy in."
}
variable "aws_default_region" {
  type        = string
  description = "The default AWS region used in this repo"
}
variable "ci_job_token" {
  type        = string
  description = "The CI Job Token to access the remote Terraform state file"
}

