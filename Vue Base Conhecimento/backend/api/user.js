const bcrypt = require('bcrypt-nodejs')


module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async(req, res) => {
        const user = {...req.body }


        if (req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome nao informado')
            existsOrError(user.email, 'Email nao informado')
            existsOrError(user.password, 'Password nao informado')
            existsOrError(user.confirmPassword, 'Confirmação da senha nao informado')
            equalsOrError(user.password, user.confirmPassword, 'A senha não conferem')
                //  existsOrError(user.admin, 'Admin nao informado')

            const userFromDB = await app.db('users').where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, "Usuario ja cadastrado")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword


        if (user.id) {

            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204))
                .catch(err => {
                    console.log(err)
                    res.status(500).send(err)
                })
        } else {

            app.db('users')
                .insert(user)
                .then(_ => res.status(204))
                .catch(err => res.status(500).send(err))
        }

        res.send('User save')
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deleteAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = async(req, res) => {
        try {

            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({ deleteAt: new Date() })
                .where({ id: req.params.id })
                .catch(err => res.status(500).send(err))
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')
            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }


    return { save, get, remove }
}