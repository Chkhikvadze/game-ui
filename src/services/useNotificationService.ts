import { useMutation, useQuery, QueryHookOptions } from '@apollo/client'

import notificationsGql from '../gql/notification/notifications.gql'
import notificationsByDateGql from '../gql/notification/notificationsByDate.gql'
import updateNotificationGql from '../gql/notification/updateNotification.gql'
import unreadNotificationsCountGql from '../gql/notification/unreadNotificationsCount.gql'

type NotificationFilterInput = {
  search_text: string
  page: number
  limit: number
  date?: 'today' | 'yesterday' | 'thisWeek'
}

// export const useNotificationsService = ({ search_text = '' }: NotificationFilterInput) => {
//   const {
//     data: { notifications } = [],
//     error,
//     loading,
//     refetch,
//   } = useQuery(notificationsGql, {
//     variables: {
//       filter: {
//         search_text: search_text,
//       },
//     },
//   })

//   return {
//     data: notifications || [],
//     error,
//     loading,
//     refetch,
//   }
// }

export const useNotificationsByDateService = ({
  search_text = '',
  date,
  page = 1,
  limit = 10,
}: NotificationFilterInput) => {
  const {
    data: { notificationsByDate } = [],
    error,
    loading,
    refetch,
  } = useQuery(notificationsByDateGql, {
    variables: {
      filter: {
        search_text: search_text,
        date,
        page,
        limit,
      },
    },
  })

  return {
    data: notificationsByDate || [],
    error,
    loading,
    refetch,
  }
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
    update: (cache: any, { data }: any) => {
      if (data && data.notifications) {
        cache.writeQuery({
          query: notificationsGql,
          variables: {
            filter: {
              search_text: search_text,
            },
          },
          data: {
            notifications: data.notifications,
          },
        })
      }
    },
  } as QueryHookOptions<any, { filter: { search_text: string } }>)

  return {
    data: notifications || [],
    error,
    loading,
    refetch,
  }
}

export const useUnreadNotificationsCountService = () => {
  const {
    data: { unreadNotificationsCount } = [],
    error,
    loading,
    refetch,
  } = useQuery(unreadNotificationsCountGql)

  return {
    data: unreadNotificationsCount || [],
    error,
    loading,
    refetch,
  }
}

// export const useUpdateNotificationService = () => {
//   const [mutation] = useMutation(updateNotificationGql)
//   const updateNotificationById = async (id: any, input: any): Promise<{ success: boolean }> => {
//     const {
//       data: { notification },
//     } = await mutation({
//       variables: {
//         id,
//         input,
//       },
//     })
//     return notification
//   }

//   return [updateNotificationById]
// }

export const useUpdateNotificationService = () => {
  const [mutation] = useMutation(updateNotificationGql)

  const updateNotificationById = async (id: any, input: any): Promise<{ success: boolean }> => {
    await mutation({
      variables: {
        id,
        input,
      },
      update: (cache, { data }) => {
        // Update the cache with the updated notification data
        cache.modify({
          id: cache.identify(data.notification),
          fields: {
            // Update specific fields as per your data structure
            // For example, if the notification has a "message" field:
            message: () => input.message,
          },
        })
      },
    })

    return { success: true }
  }

  return [updateNotificationById]
}
