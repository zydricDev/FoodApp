function filter(model){
    return async (req, res, next)=>{
        try{
            let modelCategory = req.params.category
            let modelfeature = req.params.feature
            let filtered = undefined

            if (modelCategory) {
                filtered = await model.find({
                    category: modelCategory,
                    feature: modelfeature
                })
            }
                    
            if(modelCategory === 'null'){
                filtered = await model.find({
                    feature: modelfeature
                })
            }


            
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

            result.result = filtered.slice(startIndex, endIndex)
            res.filter = result


            next()
                
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = filter;