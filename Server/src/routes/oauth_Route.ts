import express  from "express";
import passport from "passport";
import { Google_OAuth_Controller } from "../controller/Auth_Controller";

export const OAuth_route = express.Router();

//Render Views/file.ejs
// OAuth_route.get('/check', (req, res) => {
//   res.render('oAuth');
// });

//Google
OAuth_route.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

OAuth_route.get('/auth/google/redirects',
  passport.authenticate('google', { failureRedirect: '/oauthorize/auth/google', session: false }),
  Google_OAuth_Controller
);

//Facebook
// route.get('/auth/facebook', 
//     passport.authenticate('facebook',  { scope: ['email'], session: false })
// );

// route.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { session: false }),
//   FaceBook_OAuth_Controller
// );