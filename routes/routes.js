import { Router } from "../deps.js";
import { log_in, sign_up, log_out} from "./apis/usersApi.js";
import { morning_mood, evening_mood, statistic} from "./apis/reportsApi.js";
import { showLogIn, showSignUp} from "./controllers/usersController.js";
import {showLanding} from "./controllers/landingController.js";
import { showReporting, morningReport, eveningReport, Statistics} from "./controllers/reportsController.js";

const router = new Router();

router.get('/', showLanding);
router.get('/auth/login', showLogIn )
router.post('/auth/login', log_in);

router.get('/auth/registration',showSignUp );
router.post('/auth/registration', sign_up);

router.post('/auth/logout', log_out);

router.get('/behavior/reporting/morning', morning_mood);
router.post('/behavior/reporting/morning', morningReport);

router.get('/behavior/reporting',showReporting );

router.get('/behavior/reporting/evening', evening_mood);
router.post('/behavior/reporting/evening', eveningReport);

router.get('/behavior/summary', statistic);
router.post('/behavior/summary', Statistics);

export { router };
