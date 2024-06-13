import { useOne } from '@refinedev/core'

export const ShowPoduct = () => {
    const { data, isLoading } = useOne({ resource: "products", id: 123 })

    if (isLoading) {
        return <div>Loading..</div>
    }

    return <div>Product Name: {data?.data.name}</div>
}