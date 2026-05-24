import pandas as pd

df = pd.read_csv('covid_data.csv')

df = df[[
    'Entity',
    'Code',
    'Day',
    'New deaths (per 1M)'
]]

df.columns = [
    'entity',
    'code',
    'day',
    'new_deaths_per_1m'
]

df = df.dropna()

df.to_csv('cleaned_covid_data.csv', index=False)

print(df.head())