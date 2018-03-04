let token = null

const blogs = [
    {
        id: "5a451df7571c224a31b5c8ce",
        author: 'kalle',
        title: 'kirja',
        url: 'www.joojoo',
        user: {
            _id: "5a437a9e514ab7f168ddf138",
            username: "pj",
            name: "pietari"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default {getAll, blogs}