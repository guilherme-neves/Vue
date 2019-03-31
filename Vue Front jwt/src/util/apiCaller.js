
//Login e gerar o token
export function auth(usuario, http, router) {
  PubSub.publish('show-loading', '');

  http.post('http://localhost:9000/api/public/login', usuario)
    .then(response => {
      if (response.ok) {
        PubSub.publish('show-loading', 'invisible');
        //localStorage.setItem("token", response.body);

        localStorage.setItem("token", response.bodyText);
        router.push({ name: 'Dashboard' });
      } else {
          PubSub.publish('show-loading', 'invisible');
        //  showAlert('error', 'Erro: O E-mail ou a Senha não foram digitados corretamente');
      }

    }, (erro => {
      PubSub.publish('show-loading', 'invisible');
      console.log("Erro", erro)
    }));
}



//get
export function get(param, resource, router) {
  PubSub.publish('show-loading', '')

  return resource
    .query(param)
    .then(resp => {
      PubSub.publish('show-loading', 'invisible');
      return resp.json().then(json => ({ json, resp }));
    })
    .then(({ json, resp }) => {
      if (!resp.ok) {
        showAlert('error', 'Erro: Tente novamente ou entre em contato com o administrador');
        return Promise.reject(json);
      }

      return json;
    }).catch((error) => {
      if (error.status === 403) {
        window.location.href = '/#/login';
        return;
      }
      console.log('response', error);
      PubSub.publish('show-loading', 'invisible');
      // showAlert('error', 'Erro: Tente novamente ou entre em contato com o administrador');
    });

}



//Post 
export function post(resource, body) {
  PubSub.publish('show-loading', '')

  return resource
    .save(body)
    .then((resp) => {
      PubSub.publish('show-loading', 'invisible')
      return resp.json().then((json) => ({ json, resp }));
    })
    .then(({ json, resp }) => {
      if (!resp.ok) {
        return Promise.reject(json)
      }
      //sucesso
      return json
    }).catch((error) => {
      PubSub.publish('show-loading', 'invisible')
      console.log(error)
    })


}



//Put ou atualizar
export function put(resource, id, body) {
  PubSub.publish('show-loading', '')

  return resource
    .update(id, body)
    .then((resp) => {
      PubSub.publish('show-loading', 'invisible')
      return resp.json().then(json => ({ json, resp }))
    })
    .then(({ json, resp }) => {
      if (!resp.ok) {
        return Promise.reject(json)
      }

      return json
    })
    .catch(error => {
      PubSub.publish('show-loading', 'invisible');
      console.log('resposta error', error)
    })
}


//deletar
export function del(id, resource) {
  PubSub.publish('show-loading', '')

  return resource
    .delete(id)
    .then(resp => {
      PubSub.publish('show-loading', 'invisible');
      return resp.json().then(json => ({ json, resp }))
    })
    .then(({ json, resp }) => {
      if (!resp.ok) {
        return Promise.reject(json);
      } else {
        return json
      }
    })
    .catch(erro => {
      PubSub.publish('show-loading', 'invisible');
    //  console.log(erro)
    })
}