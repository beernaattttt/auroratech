import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  scope: ['identify'],
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    passport.authenticate('discord', { failureRedirect: '/' }, (err, user) => {
      if (err || !user) {
        return res.redirect('/');
      }
      req.session.user = user;
      res.redirect('/dashboard');
    })(req, res);
  }
}
