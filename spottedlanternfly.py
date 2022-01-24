from requests import get
import os
import psycopg2


def spottedlanternfly():

    DATABASE_URL = os.environ.get('DATABASE_URL')

    site = "https://www.inaturalist.org"
    endpoint = "/observations.json?orderby=observed_on&license=any&taxon_id=324726&" \
               "quality_grade=research&swlng=-178.2&swlat=6.6&nelng=-49.0&nelat=83.3&per_page=200&page=0"

    response = get(f"{site}{endpoint}")
    observations = response.json()

    conn = None

    try:
        # Establish database connection
        conn = psycopg2.connect(DATABASE_URL)

        # Create cursor
        cur = conn.cursor()
        # cur.execute("\copy (SELECT * FROM information_schema.observations) TO
        # '/Users/mitch/Desktop/observations.csv' DELIMITER ',' CSV HEADER;")

        with open('./static/js/observationsv2_1.js', 'a') as f:

            for row in observations:
                print(f"{row['id']}")
                cur.execute("INSERT INTO information_schema.observations "
                            "(id, observed_on, latitude, longitude, place, inaturl, photos) "
                            "VALUES (%s, %s, %s, %s, %s, %s, %s);",
                            (row['id'], row['time_observed_at_utc'], row['latitude'],
                             row['longitude'], row['place_guess'], row['uri'], row['photos'][0]['medium_url']))

                conn.commit()

                if cur.rowcount == 1:
                    f.seek(0, 2)
                    f.seek(f.tell() - 2, os.SEEK_SET)
                    f.truncate()
                    f.write(",")
                    f.write(f"{{\"type\":\"Feature\",\"properties\":{{\"id\":{row['id']},\"observed_on\":" 
                            f"\"{row['time_observed_at_utc']}\",\"latitude\":{row['latitude']},\"longitude\":"
                            f"{row['longitude']},\"place\":\"{row['place_guess']}\",\"inaturl\":\"{row['uri']}\","
                            f"\"photos\":\"{row['photos'][0]['medium_url']}\"}}, \"geometry\":{{\"type\":\"Point\", "
                            f"\"coordinates\":[{row['longitude']},{row['latitude']}]}}}}")
                    f.write("]}")
            f.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')