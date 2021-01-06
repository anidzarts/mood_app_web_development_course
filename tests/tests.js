import { app } from "../app.js";
import { showLanding } from "../routes/controllers/landingController.js";
import { showReporting, showSummary } from "../routes/controllers/reportingController.js";
import { errorMiddleware } from "../middlewares/middlewares.js";
import { assertEquals, superoak } from "../deps.js";


Deno.test("Error Middleware Test", async () => {
    const Middleware = () => {
    };
    const Middleware_1 = () => {
        throw Error('Middleware Test Error!');
    };
    await errorMiddleware(Middleware, Middleware);
    await errorMiddleware(Middleware, Middleware_1);
});



Deno.test( "The registration page can not be load", async() =>{

        let testClient = await superoak(app);
        var response = await testClient
            .get("/auth/registration");

    
});

Deno.test( "The login page can not be load", async() =>{

        let testClient = await superoak(app);
        var response = await testClient
            .get("/auth/login");

    
});

Deno.test( "The api page can be accessed by any user",
    async()=>{

        let testClient = await superoak(app);
        var response = await testClient
            .get("/api/summary");
      

    });

Deno.test("The api page with the date can be accesed bt any user",
    async()=> {

        const y = Math.floor(Math.random() * 20000);
        const m = Math.floor(Math.random() * 10);
        const d = Math.floor(Math.random() * 10);
        console.log(y, m, d);
        let testClient = await superoak(app);
        var response = await testClient
            .get(`/api/summary/${y}/${m}/${d}`);

        assertEquals(response.text.includes("average_sleep_duration"), true);
        assertEquals(response.text.includes("average_sleep_quality"), true);
        assertEquals(response.text.includes("average_sport_duration"), true);
        assertEquals(response.text.includes("average_study_duration"), true);
        assertEquals(response.text.includes("average_eating_quality"), true);

});

Deno.test("serveStaticFilesMiddleware", async () => {
    const testClient = await superoak(app);
    const resp = await testClient.get("/static/static.js");
    assertEquals(resp.text, "OK");

});

Deno.test({
    name: "Correct rendering of the landing page",
    async fn() {
        let usedParameterValue = "./main.ejs";

        const myRenderFunction = (parameterValue) => {
            usedParameterValue = parameterValue;
        };

        const myContext = {
            render: myRenderFunction
        };
        await showLanding(myContext);
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "Summary page testing",
    async fn() {
        let usedParameterValue = null;

        const myRenderFunction = (parameterValue) => {
            usedParameterValue = parameterValue;
        };
        const getAuthenticated = (param) => {
            return true;
        };
        const myContext = {
            session: {
                get: getAuthenticated
            },
            render: myRenderFunction,
            response: {}
        }
        await showSummary(myContext);


    },

    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "Test rendering of the reporting page",
    async fn() {
        let usedParameterValue = null;

        const myRenderFunction = (parameterValue) => {
            usedParameterValue = parameterValue;
        };
        const getAuthenticated = (param) => {
            return true;
        };
        const myContext = {
            session: {
                get: getAuthenticated
            },
            render: myRenderFunction,
            response: {}
        }
        await showReporting(myContext);


    },

    sanitizeResources: false,
    sanitizeOps: false
});



