import { get, post, del } from '../../util/apiCaller'


export default class ProdutoService {
    constructor(resource) {
        this._resource = resource('api/public/produtos{/id}')
    }


    findAll() {
        return get(null, this._resource).then(produtos => produtos)
    }

    save(produto, router) {
        return post(this._resource, produto).then((success) => {
            if (success) {
                router.push({ name: 'produtos' })
            }
        });
    }

    remove(id) {
        return del({ id: id }, this._resource);
    }

}