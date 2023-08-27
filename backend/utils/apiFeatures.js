class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            };
            this.query = this.query.find(keyword);
        }
        return this;
    }
    //filter functionality
    filter() {
        const queryCopy = { ... this.queryStr };

        //Removing field form query 
        const removeFields = ['keyword', 'limit', 'page',]

        removeFields.forEach(el => delete queryCopy[el]);
        console.log(queryCopy);
        //Advanced filtering
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}`)
        console.log(queryStr);

             
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    //pagination functionality

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.skip(skip).limit(resPerPage);
        return this;
    }
}

module.exports = APIFeatures;
