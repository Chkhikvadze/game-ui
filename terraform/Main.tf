## backend data for terraform
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "remote" {
  hostname = "app.terraform.io"  
  organization = "l3vels"

    workspaces {
      name = "l3-aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

module "frontend" {
  source           = "./frontend"
  unique_id        = var.unique_id
  interface_url    = "${var.unique_id}.${var.deployment_domain}"
  # acm_cert_arn_clf = data.terraform_remote_state.region_common.outputs.certs[var.deployment_domain].arn

  environment = var.environment
}

data "aws_route53_zone" "deployment" {
  name = var.deployment_domain
}


resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.deployment.zone_id
  name    = "${var.unique_id}.${var.deployment_domain}"
  type    = "A"

  alias {
    name                   = module.frontend.cloudfront_dns
    zone_id                = module.frontend.cloudfront_zone_id
    evaluate_target_health = true
  }
}