import React from 'react'
import styled from 'styled-components'

export interface AlertBannerProps {
  message: string
  variant: 'default' | 'error' | 'warning' | 'success' | 'info' | undefined
}

const AlertBanner = ({ message, variant }: AlertBannerProps) => (
  <MainContainer className={`alert-${variant}`}>{message}</MainContainer>
)

export default AlertBanner

const MainContainer = styled.div`
  position: relative;
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  &.alert-warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
  }

  &.alert-error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
`
