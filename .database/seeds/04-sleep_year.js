
exports.seed = function(knex, Promise) {
  
  return knex('sleep_year').insert([
    {
      year: 2019,
      'sleepYear': '2019'
    },
    {
      year: 2020,
      'sleepYear': '2020'
    },
    {
      year: 2021,
      'sleepYear': '2021'
    },
    {
      year: 2022,
      'sleepYear': '2022'
    }
  ]);
};