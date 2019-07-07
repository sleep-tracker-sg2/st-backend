
exports.seed = function(knex, Promise) {
  
  return knex('sleep_month').insert([
    {
      'month': 'January'
    },
    {
      'month': 'February'
    },
    {
      'month': 'March'
    },
    {
      'month': 'April'
    },
    {
      'month': 'May'
    },
    {
      'month': 'June'
    },
    {
      'month': 'Jul'
    },
    {
      'month': 'August'
    },
    {
      'month': 'September'
    },
    {
      'month': 'October'
    },
    {
      'month': 'November'
    },
    {
      'month': 'December'
    }
  ]);
};