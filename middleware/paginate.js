function paginate(model){
    return async (req, res, next)=>{
        try{
            let page = parseInt(req.query.page)
            let limit = parseInt(req.query.limit)
            if(!page){
                page = 1
            }
            if(limit){
                limit = 2
            }
            const result = {}
            const Model = await model.find()
            const startIndex = (page - 1) * limit
            const endIndex = (page * limit)
    
            if(endIndex < Model.length){
                result.next = {
                    page: page + 1,
                    limit: limit
                }
            }
            
            if(startIndex > 0){
                result.previous = {
                    page: page - 1,
                    limit: limit
                }
            }
            
            result.result = Model.slice(startIndex, endIndex)
            res.paginate = result
            next()
                
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = paginate;