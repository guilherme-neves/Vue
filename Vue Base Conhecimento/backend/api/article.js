module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const article = {...req.body }
        if (req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria nao informado')
            existsOrError(article.userId, 'Autor nao informado')
            existsOrError(article.content, 'Conteudo nao informado')
        } catch (msg) {
            res.status(400).send(msg)
        }


        if (article) {
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204))
                .catch(err => res.status(500).send(err))
        } else {
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204))
                .catch(err => res.status(500).send(err))
        }


    }

    const remove = async(req, res) => {
        try {
            const rowsDeleted = await app.db('articles').where({ id: req.params.id }).del()
            notExistsOrError(rowsDeleted, 'Artigos não foi encontrado')
            res.status(204)
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // usando para paginação 
    const get = async(req, res) => {

        const page = req.query.page || 1
        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async(req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'articles', u: 'users' })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderByy('a.id', 'desc')
            .then(article => res.json(article))
            .catch(err => res.status(500).send(err))
    }



    return { save, remove, get, getById, getByCategory }

}