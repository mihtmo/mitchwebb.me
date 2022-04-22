from requests import get
from datetime import date, timedelta
import os
import psycopg2


def heatblanket():
    
    today = date.today()
    buffer = today - timedelta(days = 10)

    DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')
    
    # Pull in the last 10 days of data to allow for update buffer on their end
    site = "https://www.ncei.noaa.gov/access"
    endpoint = "/services/data/v1?dataset=daily-summaries&stations=USW00013958&" \
               "startDate={}&endDate={}&dataTypes=TMAX,TMIN&format=json".format(buffer, today)

    response = get(f"{site}{endpoint}")
    heatdata = response.json()

    conn = None

    try:
        # Establish database connection
        conn = psycopg2.connect(DATABASE_URL)

        # Create cursor
        cur = conn.cursor()
        # Pull in last 10 days, convert datetime format to readable format
        cur.execute("SELECT (date::VARCHAR(19)) FROM heatdata ORDER BY date DESC LIMIT 10;")
        included_dates = cur.fetchall()

        # Insert new items
        for row in heatdata:
            
            # Check if date already exists
            if row['DATE'] in str(included_dates):
                print(f"date already added ({row['DATE']})")
                continue

            cur.execute("INSERT INTO heatdata "
                        "(date, temp_hi, temp_lo) "
                        "VALUES (%s, %s, %s);",
                        (row['DATE'], row['TMAX'], row['TMIN']))

            conn.commit()
            

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

heatblanket()