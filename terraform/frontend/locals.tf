locals {
  domain_aliases = length(var.alternate_interface_url) > 0 ? concat([var.interface_url], var.alternate_interface_url) : [var.interface_url]
  tags = merge(var.tags, {
    Name        = var.unique_id
    Environment = var.environment
  })
}
