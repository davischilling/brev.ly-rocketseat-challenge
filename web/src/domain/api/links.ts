import { LinkModel } from '../models'
import { CreateLinkFormData } from '../validations/createLink'
import { api } from './index'

export type useQueryRequest<T> = {
    queryKey: string[]
    queryFn: () => Promise<T>
}

export type useMutationRequest<T> = {
    mutationFn: (data: T) => Promise<any>
}

export const findAllLinks = (): useQueryRequest<{
    links: LinkModel[]
    total: number
}> => ({
    queryKey: ['links'],
    queryFn: () => api.get('/links').then(res => res.data),
})

export const createLinkMutation =
    (): useMutationRequest<CreateLinkFormData> => ({
        mutationFn: async (data: CreateLinkFormData) => {
            const res = await api.post('/links', data)
            return res.data
        },
    })

export const deleteLinkMutation = (): useMutationRequest<string> => ({
    mutationFn: async (shortenedUrl: string) => {
        return api.delete('/links', {
            params: { shortenedUrl }
        }).then(res => res.data)
    },
})

export const increaseLinkAccessCountMutation =
    (): useMutationRequest<string> => ({
        mutationFn: async (shortenedUrl: string) => {
            return api.patch('/links/increase-access', null, {
                params: { shortenedUrl }
            }).then(res => res.data);
        },
    });

export const getOriginalUrlQuery = (shortenedUrl: string): useQueryRequest<{
    originalUrl: string
}> => ({
    queryKey: ['originalUrl', shortenedUrl],
    queryFn: () => api.get('/links/original', {
        params: { shortenedUrl }
    }).then(res => res.data),
})

export const exportCSVMutation = (): {
    mutationFn: () => Promise<{ csvUrl: string }>
} => ({
    mutationFn: async (): Promise<{ csvUrl: string }> => {
        return api.post('/links/export').then(res => res.data);
    },
});
