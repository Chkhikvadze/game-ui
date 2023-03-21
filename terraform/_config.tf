
provider "aws" {
  region = var.aws_default_region
  default_tags {
    tags = {
      Environment = var.environment
      Region = var.aws_default_region
      Product = var.product
      UniqueId = var.unique_id
    }
  }
}

terraform {
  backend "http" {
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  required_version = ">= 0.13"
}
