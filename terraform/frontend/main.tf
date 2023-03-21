# review using waf
data "aws_wafv2_web_acl" "enviroment" {
  name  = var.web_acl_name
  scope = "CLOUDFRONT"
}

# CloudFront distribution - primary domain (S3 origin)
resource "aws_cloudfront_distribution" "interface" {
  aliases             = local.domain_aliases
  default_root_object = "index.html"
  http_version        = "http2"
  enabled             = true
  web_acl_id          = data.aws_wafv2_web_acl.enviroment.arn

  origin {
    domain_name = aws_s3_bucket.interface_url.bucket_regional_domain_name
    origin_id   = "S3-${var.interface_url}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }

  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.acm_cert_arn_clf
    ssl_support_method       = "sni-only"
    minimum_protocol_version = var.ssl_protocol_version
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD", "OPTIONS"]
    cached_methods  = ["GET", "HEAD", "OPTIONS"]

    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers_policy.id

    min_ttl     = 0
    default_ttl = 0
    max_ttl     = 0

    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = "S3-${var.interface_url}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }
  tags = local.tags
}



resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "An identity manager for origin access"
}


# S3 bucket for hosting static website
resource "aws_s3_bucket" "interface_url" {
  bucket = var.interface_url
  tags   = local.tags
}

resource "aws_s3_bucket_acl" "interface_url" {
  bucket = aws_s3_bucket.interface_url.id
  acl    = "private"
}

# Added origin only from cloudfront
resource "aws_s3_bucket_policy" "interface_url" {
  bucket = aws_s3_bucket.interface_url.id
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal":{"AWS":"${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"},
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.interface_url}/*"
        }
    ]
}
POLICY

}

/**
 * to add security headers.
 */

resource "aws_cloudfront_response_headers_policy" "security_headers_policy" {
  name = var.unique_id

  security_headers_config {
    referrer_policy {
      referrer_policy = "strict-origin-when-cross-origin"
      override        = true
    }
    content_type_options {
      override = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
    strict_transport_security {
      access_control_max_age_sec = "63072000"
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
  }
}
