
exports.seed = function(knex, Promise) {

  return knex('sleep_emotion').insert([
    {
     'emotion': '1 - Uber Unhappy'
    },
    {
     'emotion': '2 - unhappy'
    },
    {
     'emotion': '3 - neutral/happy'
    },
    {
     'emotion': '4 - Uber happy'
    },
    {
     'emotion': '5 - No data recorded'
    }
  ]);
};
