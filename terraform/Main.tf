##########################################
# Access common regional resource (ie certs)
# data "terraform_remote_state" "region_common" {
#   backend = "http"

#   config = {
#     address = "https://gitlab.com/api/v4/projects/26435484/terraform/state/us-east-1-common"
#     username = "gitlab-ci-token"
#     password = "${var.ci_job_token}"
#   }
# }

locals {
  subdomain = var.environment == "production" ? var.unique_id : "${var.unique_id}-${var.environment}"
}

# Deploys a cloudfront / s3 / lambda etc..
module "frontend" {
  source           = "./frontend"
  unique_id        = local.subdomain
  interface_url    = "${local.subdomain}.${var.deployment_domain}"
  acm_cert_arn_clf = data.terraform_remote_state.region_common.outputs.certs[var.deployment_domain].arn

  environment = var.environment
}

data "aws_route53_zone" "deployment" {
  name = var.deployment_domain
}

resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.deployment.zone_id
  name    = "${local.subdomain}.${var.deployment_domain}"
  type    = "A"

  alias {
    name                   = module.frontend.cloudfront_dns
    zone_id                = module.frontend.cloudfront_zone_id
    evaluate_target_health = true
  }
}




