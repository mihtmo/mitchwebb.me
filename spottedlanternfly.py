from requests import get
import os
import psycopg2


def spottedlanternfly():

    DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')

    site = "https://www.inaturalist.org"
    endpoint = "/observations.json?orderby=observed_on&license=any&taxon_id=324726&quality_grade=" \
                "research&swlng=-178.2&swlat=6.6&nelng=-49.0&nelat=83.3&per_page=1&page=0"

    response = get(f"{site}{endpoint}")
    observations = response.json()

    conn = None

    try:
        # Establish database connection
        conn = psycopg2.connect(DATABASE_URL)

        # Create cursor
        cur = conn.cursor()

        # with open('static/js/observations.js', 'a') as f:

        for row in observations:

            print(f"{row['id']}")
            if row['time_observed_at_utc'] is None:
                print("entry skipped due to missing observation date")
                continue

            cur.execute("INSERT INTO observations "
                        "(id, time, latitude, longitude, place, inaturl, photos) "
                        "VALUES (%s, %s, %s, %s, %s, %s, %s);",
                        (row['id'], row['time_observed_at_utc'], row['latitude'],
                        row['longitude'], row['place_guess'], row['uri'], row['photos'][0]['medium_url']))

            conn.commit()

            #     if cur.rowcount == 1:
            #         f.seek(0, 2)
            #         f.seek(f.tell() - 2, os.SEEK_SET)
            #         f.truncate()
            #         f.write(",")
            #         f.write(f"{{\"type\":\"Feature\",\"properties\":{{\"id\":{row['id']},\"time\":"
            #                 f"\"{row['time_observed_at_utc']}\",\"latitude\":{row['latitude']},\"longitude\":"
            #                 f"{row['longitude']},\"place\":\"{row['place_guess']}\",\"inaturl\":\"{row['uri']}\","
            #                 f"\"photos\":\"{row['photos'][0]['medium_url']}\"}}, \"geometry\":{{\"type\":\"Point\", "
            #                 f"\"coordinates\":[{row['longitude']},{row['latitude']}]}}}}")
            #         f.write("]}")
            # f.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

spottedlanternfly()