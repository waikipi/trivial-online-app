import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Player from "../models/Player";

passport.use(
	new LocalStrategy({
		usernameField: 'email'
	}, async (email, password, done) => {
		const player = await Player.findOne({email:email});
		if(!player){
			return done(null, false, {message:'Player not found'});
		}
		const isMatch = await player.matchPassword(password);
		if(!isMatch){
			return done(null, false, {message: 'Incorrect password'});
		}
		return done(null, player);
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
	Player.findById(id, (err, user) => {
		done(err, user);
	});
});