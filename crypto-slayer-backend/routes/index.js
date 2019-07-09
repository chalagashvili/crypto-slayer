import passport from 'passport';
import controllers from '../controllers';
import '../services/passport';

const authControl = controllers.authController;
const assetControl = controllers.assetController;
const coinMarketCapControl = controllers.coinMarketCapController;
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/signIn', requireSignin, authControl.signIn);
  app.post('/signUp', authControl.signUp);
  app.post('/addAsset', requireAuth, assetControl.addAsset);
  app.delete('/removeAsset', requireAuth, assetControl.removeAsset);
  app.put('/editAsset', requireAuth, assetControl.editAsset);
  app.get('/getAssets/:page?', requireAuth, assetControl.getAssets);
  app.get(
    '/getInstruments/:page?',
    requireAuth,
    coinMarketCapControl.getInstruments
  );
};
