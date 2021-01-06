import * as usersService from "../../services/usersService.js";

const showLogIn = async({render, session, response}) => {

  const authenticated = await session.get("authenticated");
if (!authenticated){
  var feedbacks = await session.get("feedback");
  if (!feedbacks){
    feedbacks =[];
  }
  console.log(feedbacks);

  await session.set("feedback", [])
  render('login.ejs', {feedbacks: feedbacks});
}
else{
  response.redirect("../behavior/reporting");

}



};
 
const showSignUp = async({render,session, response}) => {
  const authenticated = await session.get("authenticated");
  if (!authenticated){
  var feedbacks = await session.get("feedback");
  if (!feedbacks){
    feedbacks =[];
  }
  console.log(feedbacks);

  await session.set("feedback", [])
  render('register.ejs', {feedbacks: feedbacks});

}
else{
  response.redirect("../behavior/reporting");


}
  };

export { showLogIn, showSignUp };