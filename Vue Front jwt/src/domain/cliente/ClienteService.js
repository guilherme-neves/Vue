import { get, post, del } from '../../util/apiCaller'

export default class ClienteService {

    constructor(resource) {
        this._resource = resource('api/public/clientes{/id}')
        /// this._resource = resource('api/clientes{/id}')
    }

    findAll() {
        return get(null, this._resource).then(clientes => clientes)
    }


    save(cliente, router) {
        return post(this._resource, cliente).then((success) => {
            if (success) {
                router.push({ name: 'clientes' })
            }
        });
    }

    remove(id) {
        return del({ id: id }, this._resource);
    }

}