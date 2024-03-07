const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { createUser, getUserByEmail, getUserById } = require("./user.controller");
const { APP_URL, PORT } = process.env;
const { SignInMethods } = require("../enums/signin-methods.enum");
const { signToken } = require("../utils/jwt-auth.helper");
const { getCloudinaryResizedImage } = require("../utils/cloudinary.helper");
const { responseMessages } = require("../utils/validation-errors.values");

const googleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const googleOauth = passport.use(
  new GoogleStrategy(
    googleStrategyOptions,
    async (accessToken, refreshToken, profile, done) => {
      const { given_name, family_name, email } = profile._json;
      try {
        const user = await getUserByEmail(email);
        if (!user) {
          const newUser = {
            first_name: given_name,
            last_name: family_name,
            email,
            signin_method: SignInMethods.google_oauth,
            password: "",
            user_name: `u_${email.replace(/[.@]/g, "_")}`,
          };
          const savedUser = await createUser(newUser);
          return done(null, savedUser);
        }
        return done(null, user);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  )
);

const googleRevalidateToken = async (userId) =>{
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw { status: 400, msg: responseMessages.userNotRegistered };
    }
    const signedToken = signToken({ id: user.id, user_name:user.user_name });
    return {
      token: signedToken,
      user_name: user.user_name,
      image: getCloudinaryResizedImage(user.Profile.image),
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { googleOauth, googleRevalidateToken };
