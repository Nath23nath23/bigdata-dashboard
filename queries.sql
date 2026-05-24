-- Query 1
SELECT entity,
AVG(new_deaths_per_1m) AS average_deaths
FROM covid_data
GROUP BY entity
ORDER BY average_deaths DESC
LIMIT 10;

-- Query 2
SELECT entity,
MAX(new_deaths_per_1m) AS highest_death_rate
FROM covid_data
GROUP BY entity
ORDER BY highest_death_rate DESC
LIMIT 10;

-- Query 3
SELECT day,
AVG(new_deaths_per_1m) AS global_average
FROM covid_data
GROUP BY day
ORDER BY global_average DESC
LIMIT 10;