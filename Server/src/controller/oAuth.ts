import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy, Profile as FacebookProfile } from "passport-facebook";

//Google Strategy
export const googleOAuth = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (
      accessToken: string | null,
      refreshToken: string | null,
      profile: GoogleProfile,
      done
    ) => {
      done(null, {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
      });
    }
  )
);

// Facebook Strategt
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_CLIENT_ID!,
//       clientSecret: process.env.FB_CLIENT_SECRET!,
//       callbackURL: "/auth/facebook/callback",
//       profileFields: ["id", "displayName", "emails"],
//       passReqToCallback: false,
//     },
//     (
//       accessToken: string | null,
//       refreshToken: string | null,
//       profile: FacebookProfile,
//       done
//     ) => {
//       done(null, {
//         id: profile.id,
//         name: profile.displayName,
//         email: profile.emails?.[0]?.value || null,
//       });
//     }
//   )
// );
