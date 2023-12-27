const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name"
});

const tableName = "reviews";

async function destroy(review_id) { 
  // TODO: Write your code here
  return db(tableName)
    .where({ review_id })
    .del();
}

async function list(movie_id) {
  // TODO: Write your code here
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
    .then(result => result.map(addCritic))
}

async function read(review_id) {
  // TODO: Write your code here
  return db(tableName)
    .select("*")
    .where({ review_id })
    .first();
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};
