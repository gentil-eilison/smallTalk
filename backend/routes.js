const express = require('express')
const router = express.Router()
const PageController = require('./controllers/PageController')
const UserController = require('./controllers/UserController')
const FrontController = require('./controllers/FrontController')

// Page Controller

router.get('/discover', PageController.sendDiscover)

router.get('/index', PageController.sendIndex)

router.get('/register', PageController.sendRegister)

router.use('/profile/:id', UserController.getSimpleProfileInfo)

router.get('/profile/:id', UserController.getInterestsProfileInfo)

router.get('/profile/:id', UserController.getFinalProfileInfo)

router.post('/friendProfile/:id', PageController.sendProfile)

router.get('/profile', PageController.sendProfile)

router.get('/friends', PageController.sendFriends)

// User Controller

router.post('/createUser', UserController.createUser)

router.post('/login', UserController.logUser)

router.get('/exit', UserController.logOut)

router.post('/registerInterest', UserController.registerInterest)

router.get('/removeLanguages', UserController.removeLanguges)

router.post('/addFriend', UserController.addFriend)


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

router.post('/getFilteredUsers', FrontController.getFilteredUsers)

router.get('/getUserFriends', FrontController.getUserFriends)


module.exports = router

