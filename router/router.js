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
const { createBanner, updateBanner, getBanners } =  require('../controller/AdminControllers/AdminBannerController');
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
router.post('/Admin/terms',authenticateToken , authenticateAdmin , createOrUpdateTerms);
router.get('/Admin/terms', authenticateToken , getTermsAndConditions);
router.post('/Admin/privacyPolicy', authenticateToken , authenticateAdmin , createOrUpdatePolicy );
router.get('/Admin/privacyPolicy', authenticateToken , getPrivacyPolicy);
router.post('/Admin/wallet' , authenticateToken , authenticateAdmin, updateAdminBonus);
router.get('/Admin/user', authenticateToken , getUserAdmin);
router.post('/Admin/Notification' , authenticateToken , authenticateAdmin , Notification);
router.get('/Admin/getNotification' , authenticateToken , authenticateAdmin , getNotifications);
router.post('/Admin/AddMatches', addMatch);
router.get('/Admin/GetAllMatches', getMatches);
router.post('/Admin/Banner/Create' ,ImageMiddleware , createBanner);
router.post('/Admin/Banner/Update/:id' , ImageMiddleware , updateBanner);

// Route to create a contest
router.post('/createContest', authenticateAdmin , createContest);





// App Routers
router.post('/App/register', registerOrLogin );
router.patch('/App/update', authenticateToken , ImageMiddleware , updateCandidateData);


module.exports = router;