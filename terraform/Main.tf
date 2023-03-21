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

