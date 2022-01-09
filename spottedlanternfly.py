from requests import get
import os
import psycopg2


def spottedlanternfly():

    site = "https://www.inaturalist.org"
    endpoint = "/observations.json?orderby=observed_on&license=any&taxon_id=324726&" \
               "quality_grade=research&swlng=-178.2&swlat=6.6&nelng=-49.0&nelat=83.3&per_page=200&page=15"

    response = get(f"{site}{endpoint}")
    observations = response.json()

    DATABASE_URL = os.environ.get('DATABASE_URL')
    conn = None

    try:
        # Establish database connection
        conn = psycopg2.connect(DATABASE_URL)

        # Create cursor
        cur = conn.cursor()

        for row in observations:
            print(f"{row['id']}")
            cur.execute("INSERT INTO observations (id, observed_on, latitude, longitude, place, inaturl, photos)"
                        "VALUES (%s, %s, %s, %s, %s, %s, %s);",
                        (row['id'], row['time_observed_at_utc'], row['latitude'],
                         row['longitude'], row['place_guess'], row['uri'], row['photos'][0]['medium_url']))

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        conn.commit()
        if conn is not None:
            conn.close()
            print('Database connection closed.')

    return observations

spottedlanternfly()