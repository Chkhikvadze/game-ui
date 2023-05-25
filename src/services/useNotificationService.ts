import { useMutation, useQuery, QueryHookOptions } from '@apollo/client'

import notificationsGql from '../gql/notification/notifications.gql'
import updateNotificationGql from '../gql/notification/updateNotification.gql'

type NotificationFilterInput = {
  search_text: string
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
