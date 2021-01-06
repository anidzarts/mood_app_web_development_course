let config = {};

if (Deno.env.get('new')) {
  config.database = Deno.env.get('new');
} else {
  config.database = {
    hostname: "dumbo.db.elephantsql.com",
    database: "xxodjlqn",
    user: "xxodjlqn",
    password: "sOMsK5wMoeJHMUCk8KvVoUkaQEkSlOoj",
    port: 5432
  };
}
let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}
export { config }; 


