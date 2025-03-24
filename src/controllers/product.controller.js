export class ProductController {
    constructor() {

    }

    getProducts = async (req, res, next) => {
        try {
            let { limit, page, query, sort } = req.params
            limit = limit ?? 10
            page = page ?? 1
            query = query ?? ''
            sort = sort ?? null

            console.log({ limit, page, query, sort })

            res.send({
                message: 'Get products',
                data: [],
            })
        } catch (error) {
            next(error)
        }
    }
}
