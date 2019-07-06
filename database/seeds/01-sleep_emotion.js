
exports.seed=function(knex,Promise) {
  return knex('emotion').insert([
    {
      "emotion": "1 - Uber Unhappy"
    },
    {
      "emotion": "2 - Unhappy"
    },  
    {
      "emotion": "3 - Neutral/Happy"
    },
    {
      "emotion": "4 - Uber Happy"
    },
    {
      "emotion": "5 - Sleep stats not logged"
    }
  ]);
};