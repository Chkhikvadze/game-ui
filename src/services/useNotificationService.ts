import { useMutation, useQuery } from '@apollo/client'

import notificationsGql from '../gql/notification/notifications.gql'

type NotificationFilterInput = {
  search_text: string
}

export const useNotificationsService = ({ search_text = '' }: NotificationFilterInput) => {
  const {
    data: { notifications } = [],
    error,
    loading,
    refetch,
  } = useQuery(notificationsGql, {
    variables: {
      filter: {
        search_text: search_text,
      },
    },
  })

  return {
    data: notifications || [],
    error,
    loading,
    refetch,
  }
}
