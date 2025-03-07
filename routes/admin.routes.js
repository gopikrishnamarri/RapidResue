module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller')

    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);


    app.get('/api/getAllUsers', admin.getAllUsers);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);


}