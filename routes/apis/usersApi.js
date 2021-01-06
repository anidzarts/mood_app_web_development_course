import * as usersService from "../../services/usersService.js";
import {bcrypt} from "../../deps.js";
import { validate, required, isEmail } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const getData = async (request) => {
    const data = {
      email: "",
      password: "",
      feedbacks: [],
    };
  
    if (request) {
      const body = request.body();
      const params = await body.value;
      data.password = params.get("password");
      data.email = params.get("email");
    }
  
    return data;
  };
  

const validationRules = {
    email: [required, isEmail],
};


  const validateMe = async(data) => {

    const [passes, errors] = await validate({email:data.email }, validationRules);

    const feedbacks = [];
    if (!data.password || data.password.length < 5 ) {
      feedbacks.push("Password length should be at least 4 characters");
    }
    console.log(errors);
    if (errors)
    if (errors.email)
    if (errors.email.isEmail){
        feedbacks.push(errors.email.isEmail);
    }
    if (!data.email || !data.email.includes('@') || data.email.length < 6) {
        feedbacks.push("This is not an authentic email.");
    }
    
    return feedbacks;
  };

  
const log_in = async({ response, request, session}) => {

    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    
    const data= await usersService.getUsersItem(email);
    console.log(data);
    if (!data){
        response.status = 401;
        await session.set('feedback', ["No existing user"]);

        response.redirect('/auth/login');
        return;
    }
    const passwordCorrect = await bcrypt.compare(password,data.password );
    console.log(passwordCorrect);
    if (!passwordCorrect) {
        response.status = 401;
        await session.set('feedback', ["Wrong login"]);

        response.redirect('/auth/login');
        return;
        }

    await session.set('authenticated', true);
    await session.set('user', {
            id: data.id,
            email: data.email
        });

    await session.set('feedback', ["Authenticated successfully"]);
    response.redirect('/behavior/reporting');  
    
};


const sign_up = async({ request, response, session}) =>{
    
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password = params.get('password');
    console.log(email, password);
    // here, we would validate the data, e.g. checking that the 
    // email really is an email
    //password > 4
    const data_to_validate = await getData(request);
     const feedbacks =await  validateMe(data_to_validate);
    if (feedbacks.length>0){
        response.status=404;
        console.log("ok");
        await session.set('feedback',feedbacks);

        response.redirect('/auth/registration');
        return;
    }
    var database_data= await usersService.getUsersItem(email);
    if(database_data){
        if (database_data!=[]){
        response.status=404;
        await session.set('feedback', ["email already in use"]);

        response.redirect('/auth/registration');
        return;
        }
    }

  
    const hash = await bcrypt.hash(password);
    // when storing a password, store the hash    
    await usersService.addUsersItem(email, hash);
    await session.set('authenticated', true);
    database_data= await usersService.getUsersItem(email);

    await session.set('user', {
            id: database_data.id,
            email: database_data.email
        });
        await session.set('feedback', ["Authenticated successfully"]);

        response.redirect('/behavior/reporting');

        
    }

const log_out = async({response, session}) =>{
    await session.set('authenticated', false);
    await session.set('user', {
            id: "",
            email: ""
        });
    await session.set('feedback', ["Logged Out"]);

    response.redirect('/auth/login');

}


export { log_in, sign_up, log_out};
