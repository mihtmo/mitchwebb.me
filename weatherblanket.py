### PRESENTLY NOT IN USE, NO LONGER USING DATABASE FOR THIS PROJECT

# from requests import get
# from datetime import date, timedelta
# import os
# import psycopg2


# def weatherblanket():
    
#     today = date.today()
#     buffer = today - timedelta(days = 15)

#     DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')
    
#     # Pull in the last 15 days of data to allow for update buffer on their end
#     site = "https://www.ncei.noaa.gov/access"
#     endpoint = "/services/data/v1?dataset=global-summary-of-the-day&stations=72254413958&" \
#                "startDate={}&endDate={}&dataTypes=MAX,MIN,PRCP,VISIB&format=json".format(buffer, today)

#     response = get(f"{site}{endpoint}")
#     weatherdata = response.json()

#     conn = None

#     try:
#         # Establish database connection
#         conn = psycopg2.connect(DATABASE_URL)

#         # Create cursor
#         cur = conn.cursor()
#         # Pull in last 15 days, convert datetime format to readable format
#         cur.execute("SELECT (date::VARCHAR(19)) FROM weatherdata ORDER BY date DESC LIMIT 15;")
#         included_dates = cur.fetchall()

#         # Insert new items
#         for row in weatherdata:
            
#             # Check if date already exists
#             if row['DATE'] in str(included_dates):
#                 # For heroku task logging
#                 print(f"date already added ({row['DATE']})")
#                 continue

#             # else: 
#             cur.execute("INSERT INTO weatherdata "
#                         "(date, temp_hi, temp_lo, visib, rain) "
#                         "VALUES (%s, %s, %s, %s, %s);",
#                         (row['DATE'], row['MAX'], row['MIN'], row['VISIB'], row['PRCP']))
#             # For heroku task logging
#             print(f"new date added ({row['DATE']})")

#             conn.commit()
            

#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)

#     finally:
#         if conn is not None:
#             conn.close()
#             print('Database connection closed.')

# weatherblanket()