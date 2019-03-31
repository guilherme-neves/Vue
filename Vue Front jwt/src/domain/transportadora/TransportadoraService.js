import { get, post, del } from '../../util/apiCaller'


export default class TransportadoraService {
    constructor(resource) {
        this._resource = resource('api/public/transportadoras{/id}')
    }


    findAll() {
        return get(null, this._resource).then(transportadora => transportadora)
    }

    save(transportadora, router) {
        return post(this._resource, transportadora).then((success) => {
            if (success) {
                router.push({ name: 'transportadoras' })
            }
        });
    }

    remove(id) {
        return del({ id: id }, this._resource);
    }

}