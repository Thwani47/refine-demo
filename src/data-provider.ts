import type { DataProvider } from '@refinedev/core'

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider: DataProvider = {
    getOne: async ({ resource, id, meta }) => {
        const response = await fetch(`${API_URL}/${resource}/${id}`);

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json()
        return { data };
    },
    getMany: () => {
        throw new Error('Non implemented!');
    },
    update: async ({ resource, id, variables }) => {
        const response = await fetch(`${API_URL}/${resource}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(variables),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json()
        return { data };
    },
    updateMany: () => {
        throw new Error('Non implemented!');
    },
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
        const params = new URLSearchParams()

        if (pagination) {
            params.append('_start', ((pagination.current! - 1) * pagination.pageSize!).toString());
            params.append('_end', (pagination.current! * pagination.pageSize!).toString());
        }

        if (sorters && sorters.length > 0) {
            params.append('_sort', sorters.map(sorter => sorter.field).join(','))
            params.append('_order', sorters.map(sorter => sorter.order).join(','))
        }

        if (filters && filters.length > 0){
            filters.forEach(filter => {
                if ("field" in filter && filter.operator === "eq"){
                    params.append(filter.field, filter.value)
                }
            })
        }

        const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json()

        return {
            data,
            total: 0
        }
    },
    create: () => {
        throw new Error('Non implemented!');
    },
    createMany: () => {
        throw new Error('Non implemented!');
    },
    deleteOne: () => {
        throw new Error('Non implemented!');
    },
    deleteMany: () => {
        throw new Error('Non implemented!');
    },
    getApiUrl: () => API_URL,
}