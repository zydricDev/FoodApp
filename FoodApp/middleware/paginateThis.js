function paginateThis(model) {
    return async (req, res, next) => {
        try {
            let filtered = await model.find().sort({feature: -1})
            
            let page = parseInt(req.query.page)
            let limit = 9

            const result = {}
            const startIndex = (page - 1) * limit
            const endIndex = (page * limit)

            if (endIndex < filtered.length) {
                result.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            let pagesAhead = []
            let pagesBefore = []

            for (let i = 1; i <= 3; i++) {
                if (startIndex + i * limit < filtered.length) {
                    pagesAhead.push(i + page)
                }
                if (startIndex - i * limit >= 0) {
                    pagesBefore.unshift(page - i)
                }
            }


            result.possiblePages = {
                ahead: pagesAhead,
                before: pagesBefore,
                current: page,
                maxPage: Math.ceil(filtered.length / limit),
            }


            result.result = filtered.slice(startIndex, endIndex)
            res.paginateThis = result
            next()

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = paginateThis;