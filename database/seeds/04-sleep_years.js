
export.seed=(knex,Promise) {
  return knex('years').insert([
    {
      "year": 2019,
      "description": "2019"
    },
    {
      "year": 2020,
      "description": "2020"
    },
    {
      "year": 2021,
      "description": "2021"
    },
    {
      "year": 2022,
      "description": "2022"
    },
    {
      "year": 2023,
      "description": "2023"
    },
  ])
}