import Users from '../../database/Models/users.js'

export const apiLogin = async (req, res) => {
    console.log(req)
    try {
        const { login, password } = req.body

        const searchUser = await Users.findOne({ login: login, password: password })

        if (searchUser) {
            res.status(200).json({ message: 'Successful authorization' })
        } else {
            res.status(400).json({ error: 'User not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'ERROR' })
    }
}
