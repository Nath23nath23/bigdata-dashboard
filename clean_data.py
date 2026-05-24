import pandas as pd

# LOAD DATA
df = pd.read_csv('covid_data.csv')

# SELECT NEEDED COLUMNS
df = df[[
    'Entity',
    'Code',
    'Day',
    'New deaths (per 1M)'
]]

# RENAME COLUMNS
df.columns = [
    'entity',
    'code',
    'day',
    'new_deaths_per_1m'
]

# HANDLE MISSING VALUES
df = df.dropna()

# NORMALIZATION
max_value = df['new_deaths_per_1m'].max()

df['normalized_deaths'] = (
    df['new_deaths_per_1m'] / max_value
)

# OUTLIER REMOVAL USING IQR
Q1 = df['new_deaths_per_1m'].quantile(0.25)
Q3 = df['new_deaths_per_1m'].quantile(0.75)

IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

df = df[
    (df['new_deaths_per_1m'] >= lower_bound) &
    (df['new_deaths_per_1m'] <= upper_bound)
]

# EXPORT CLEANED DATA
df.to_csv(
    'cleaned_covid_data.csv',
    index=False
)

print(df.head())