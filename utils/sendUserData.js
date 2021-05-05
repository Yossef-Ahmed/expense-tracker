module.exports = (user, token, res) => {
    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        categories: user.categories,
        userActive: user.active
    });
}