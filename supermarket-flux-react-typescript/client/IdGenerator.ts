class ProductIdGenerator {
    private static _currentId = 0;
    
    static getId() {
        var res = this._currentId;
        this._currentId++;
        return res;
    }
}

export default ProductIdGenerator;
