const express = require('express')
const router = express.Router()

const PageController = require('./controllers/PageController')
const UserController = require('./controllers/UserController')
const FrontController = require('./controllers/FrontController')

// Page Controller

router.get('/index', PageController.sendIndex)

router.get('/register', PageController.sendRegister)

router.get('/profile', PageController.sendProfile)

router.get('/friends', PageController.sendFriends)

router.get('/discover', PageController.sendDiscover)

// User Controller

router.post('/createUser', UserController.createUser)

router.post('/login', UserController.logUser)

router.get('/exit', UserController.logOut)

router.post('/registerInterest', UserController.registerInterest)

router.get('/removeLanguages', UserController.removeLanguges)

    // Profile Page

router.post('/saveBio', UserController.saveBio)

router.get('/deleteUser', UserController.deleteUser)

router.post('/changePassword', UserController.changePassword)

router.get('/addLanguages', UserController.addLanguages)

router.post('/uploadProfilePicture', UserController.uploadProfilePicture)

// Front Controller 

router.get('/getUser', FrontController.getLoggedUser)

router.get('/getUserLanguages', FrontController.getUserLanguages)

router.get('/getNotLoggedUsers', FrontController.getNotLoggedUsers)

router.get('/getNotLoggedUsersLanguages', FrontController.getNotLoggedUsersLanguages)

router.get('/getUserInterests', FrontController.getUserInterests)

router.get('/getUserLanguagesId', FrontController.getUserLanguagesId)

router.get('/getUserLanguagesName', FrontController.getUserLanguagesName)

router.get('/getFilteredUsers', FrontController.getFilteredUsers)

module.exports = router

