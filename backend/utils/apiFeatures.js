class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keywords) {
            const keywords = {
                name: {
                    $regex: this.queryStr.keywords,
                    $options: 'i'
                }
            };
            this.query = this.query.find(keywords);
        }
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.skip(skip).limit(resPerPage);
        return this;
    }
}

module.exports = APIFeatures ;
