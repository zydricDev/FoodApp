function filter(model){
    return async (req, res, next)=>{
        try{
            let modelCategory = req.params.category
            let modelfeature = req.params.feature
            let filtered = undefined
            
            if (modelCategory !== 'null' && modelfeature) {
                if(modelfeature === 'false'){
                    filtered = await model.find({
                        category: modelCategory
                    })
                    .sort({
                        feature: -1,
                    })
                }else{
                    filtered = await model.find({
                        category: modelCategory,
                        feature: modelfeature
                    })
                }    
            }
                    
            if(modelCategory === 'null' && modelfeature){
                filtered = await model.find({
                    feature: modelfeature
                })
            }

            if(modelCategory === 'null' && modelfeature === 'false'){
                filtered = await model.find().sort({
                    feature: -1,
                })
            }
            
            


            
            let page = parseInt(req.query.page)
            let limit = 2

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

            for(let i=1; i<=3; i++){
                if( startIndex+i*limit < filtered.length ){
                    pagesAhead.push(i+page)
                }
                if( startIndex-i*limit >= 0 ){
                    pagesBefore.unshift(page-i)
                }
            }
            
            
            result.possiblePages = {
                ahead: pagesAhead,
                before: pagesBefore,
                current: page   
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