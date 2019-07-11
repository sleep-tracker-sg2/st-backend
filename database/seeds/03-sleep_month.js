
exports.seed = function(knex) {
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
          'month': 'July'
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

