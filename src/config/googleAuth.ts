import passport from "passport";
import { Request } from "express";
import google from "passport-google-oauth20";
import Usermodel from "../model/user.ts";

import dotenv from "dotenv";
dotenv.config();

interface IDInterface extends Request {
  id: String;
}
export default async function setUpAuth() {
  const googleStragy = google.Strategy;

  passport.use(
    new googleStragy(
      {
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL: process.env.CALLBACK_URL_FOR_GOOGLE,
      },
      async function (
        request: string,
        accessToken: string,
        refreshToken: any,
        profile: google.Profile,

        done: google.VerifyCallback
      ) {
        try {
          console.log(profile);
          const useEmail: String = profile._json.email;
          console.log(useEmail);
          const user = await Usermodel.findOne({
            email: profile._json.email,
          });
          console.log("the use is " + user);
          if (!user) {
            const res = await Usermodel.create({
              name: profile.displayName,
              email: useEmail,
              password: Date.now().toString(),
              googleId: profile.id,
            });
            console.log(res);
          }
        } catch (err) {
          console.log(err);
        }

        const bro = { id: profile.id };

        // Now token and user are ready store them in DB
        done(null, bro);
      }
    )
  );
  passport.serializeUser(function (bro, done) {
    console.log("Serialize bro");
    console.log(bro);
    done(null, bro);
  });

  passport.deserializeUser(function (obj, done) {
    console.log("DeSerialize bro");
    console.log(obj);
    done(null, obj);
  });
}
