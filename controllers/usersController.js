const db = require("../database");

const getAllUsers = (req, res) => {
    try {
        var sql = "select * from user"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    } catch (error) {
        console.log(error.message);
    }
}

const getUser = (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
}

const createUser = (req, res, next) => {
    var errors = []
    if (!req.body.email) {
        errors.push("No email specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email
    }
    var sql = 'INSERT INTO user (name, email) VALUES (?,?)'
    var params = [data.name, data.email]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
}

const updateUser = (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
    }
    db.run(
        `UPDATE user set 
           name = coalesce(?,name), 
           email = COALESCE(?,email)
           WHERE id = ?`,
        [data.name, data.email, req.params.id],
        (err, result) => {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({
                message: "success",
                data: data
            })
        });
}

const deleteUser = (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", rows: this.changes })
        });
}

const searchUser = (req, res, next) => {
    var params = [req.params.query]
    var sql = `select * from user where name LIKE ?`;
    const q = `%${params}%`;

    db.get(sql, q, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
}


module.exports = {
    getAllUsers, getUser, createUser, updateUser, deleteUser, searchUser
}


