from requests import get
import os
import psycopg2


def spottedlanternfly():

    DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')

    site = "https://api.inaturalist.org/v1"
        
    endpoint = f"/observations?place_id=1&taxon_id=324726&quality_grade=research&page=1&per_page=200&order=desc&order_by=created_at"
    
    response = get(f"{site}{endpoint}")
    fulljson = response.json()
    observations = fulljson['results']

    conn = None

    try:
        # Establish database connection
        conn = psycopg2.connect(DATABASE_URL)

        # Create cursor
        cur = conn.cursor()
        # with open('static/js/observations.js', 'a') as f:
        for item in observations:
            print(f"{item['id']}")
            if item['time_observed_at'] is None:
                print("entry skipped due to missing observation date")
                continue

            cur.execute("INSERT INTO observations "
                        "(id, time, latitude, longitude, place, inaturl) "
                        "VALUES (%s, %s, %s, %s, %s, %s);",
                        (item['id'], item['time_observed_at'], item['geojson']['coordinates'][1],
                        item['geojson']['coordinates'][0], item['place_guess'], item['uri']))

            conn.commit()
                
                # if cur.itemcount == 1:
            #     f.seek(0, 2)
            #     f.seek(f.tell() - 2, os.SEEK_SET)
            #     f.truncate()
            #     f.write(",")
            #     f.write(f"{{\"type\":\"Feature\",\"properties\":{{\"id\":{item['id']},\"time\":"
            #             f"\"{item['time_observed_at']}\",\"latitude\":{item['geojson']['coordinates'][1]},\"longitude\":"
            #             f"{item['geojson']['coordinates'][0]},\"place\":\"{item['place_guess']}\",\"inaturl\":\"{item['uri']}\"}}, "
            #             f"\"geometry\":{{\"type\":\"Point\", \"coordinates\":[{item['geojson']['coordinates'][0]},{item['geojson']['coordinates'][1]}]}}}}")
            #     f.write("]}")
                    
            # f.close()
            

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

spottedlanternfly()