locals {
  domain_aliases = var.alternate_interface_url != "" ? concat([var.interface_url], [var.alternate_interface_url]) : [var.interface_url]
  tags = merge(var.tags, {
    Name        = var.unique_id
    Environment = var.environment
  })
}
