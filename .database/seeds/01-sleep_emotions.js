
exports.seed = function(knex) {
      return knex('sleep_emotions').insert([
        {
          'emotion': '1 - Very Unhappy'
        },
        {
          'emotion': '2 - Unhappy'
        },
        {
          'emotion': '3 - Neutral/Happy'
        },
        {
          'emotion': '4 - Very Happy'
        },
        {
          'emotion': '5 - No data recorded'
        }

      ]);
    };

