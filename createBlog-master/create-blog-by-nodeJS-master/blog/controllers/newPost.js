module.exports = (req, res) => {
    if (req.session.userId){ //kiem tra xem session co chua userid hay khong?
        return res.render('create')
    }
    res.redirect('/auth/login')
}