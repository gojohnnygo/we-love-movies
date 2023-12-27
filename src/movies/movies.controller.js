const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const movie_id = request.params.movieId;
  const movie = await service.read(movie_id);
  
  if (movie) {
    response.locals.movie = movie;
    return next();
  }

  next({
    status: 404,
    message: `Movie cannot be found.`
  });
}

async function read(request, response) {
  // TODO: Add your code here
  const movie_id = request.params.movieId;
  response.json({ data: await service.read(movie_id) });
}

async function list(request, response) {
  // TODO: Add your code here.
  const is_showing = request.query.is_showing === 'true';
  response.json({ data: await service.list(is_showing) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  movieExists: asyncErrorBoundary(movieExists),
  read: [asyncErrorBoundary(movieExists), read],
};
