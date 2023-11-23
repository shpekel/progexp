import Users from '../../database/Models/users.js'

export const apiRegister = async (req, res) => {
    try {
        const { login, password, email } = req.body

        const newUser = new Users({
            login: login,
            password: password,
            email: email
        })
        await newUser.save()
        res.status(201).json({ message: 'User has been created' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'ERROR' })
    }
}
