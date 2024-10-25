// routes/auth.js
const express = require('express');
const { verifyOtp } = require('../controller/AppControllers/otpController');
const upload = require("../middleware/imageUpload");
const updateCandidateData =  require('../controller/AppControllers/UpdateUserDetails');
const ImageMiddleware   =  require('../middleware/imageUpload');
const { registerOrLogin } = require('../controller/AppControllers/LoginAndRegister');
const {loginAdmin  , registerAdmin} =  require('../controller/AdminControllers/AdminLogin')
const { update } = require('../controller/AdminControllers/AdminChangePassword');
const { createOrUpdateTerms, getTermsAndConditions } = require('../controller/AdminControllers/TermsAndCondition');
const {createOrUpdatePolicy,getPrivacyPolicy} =  require('../controller/AdminControllers/PrivacyPolicy');
const {authenticateToken , authenticateAdmin} = require('../middleware/auth');
const {updateAdminBonus} =  require('../controller/AdminControllers/updateAmount');
const { addMatch, getMatches } = require('../controller/AdminControllers/Match.controller'); 
const {Notification, getNotifications} =  require('../controller/AdminControllers/Notification.Controller');
const {user, getUserAdmin} =  require('../controller/AdminControllers/AdminUserData');
const { createContest } = require('../controller/AdminControllers/CreateContest');
const router = express.Router();



// Admin Routers 
router.post('/AdminLogin' , loginAdmin);
router.post('/AdminRegister' , registerAdmin);
router.post('/updatePassword/:id', authenticateToken, authenticateAdmin, update); 
router.post('/terms', authenticateAdmin , createOrUpdateTerms);
router.get('/terms', authenticateToken , getTermsAndConditions);
router.post('/privacyPolicy', authenticateAdmin , createOrUpdatePolicy );
router.get('/privacyPolicy', authenticateToken , getPrivacyPolicy);
router.post('/wallet' , authenticateToken , authenticateAdmin, updateAdminBonus);
router.get('/user', authenticateToken , getUserAdmin);
router.post('/Notification' , authenticateToken , authenticateAdmin , Notification);
router.get('/getNotification' , authenticateToken , authenticateAdmin , getNotifications);
router.post('/AddMatches', addMatch);
router.get('/GetAllMatches', getMatches);



// Route to create a contest
router.post('/createContest', authenticateAdmin , createContest);





// App Routers
router.post('/register', registerOrLogin );
router.patch('/update', authenticateToken , ImageMiddleware , updateCandidateData);


module.exports = router;