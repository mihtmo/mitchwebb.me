from requests import get, HTTPError
import os
# import psycopg2
from requests.exceptions import RequestException
# from time import sleep


def spottedlanternfly():

    # DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')
    
    with open('frontend/static/js/observations.js', 'a') as file:
        
        # Delete all observations leaving geojson starter text and variable name
        file.seek(0)
        file.seek(file.tell() + 3663255, os.SEEK_SET)
        file.truncate()
        
        # Sidestep pull restrictions
        for i in range(1, 50):
            
            try:
                # Connect to inaturalist API
                site = "https://api.inaturalist.org/v1"
                endpoint = "/observations?place_id=1&taxon_id=324726&quality_grade=research&year=2022&page={}&per_page=200&order=desc&order_by=created_at".format(i)
                
                response = get("{}{}".format(site, endpoint))
                response.raise_for_status()
                print(response)
                fulljson = response.json()
                observations = fulljson['results']

                # conn = None

                ## Establish database connection
                # conn = psycopg2.connect(DATABASE_URL)
                
                # cur = conn.cursor()
                
                for item in observations:
                    
                    print(item['id'])
                    
                    # If no observation time, do not include
                    if item['time_observed_at'] is None:
                        print("entry skipped due to missing observation date")
                        continue

                    # cur.execute("INSERT INTO observations "
                    #             "(id, time, latitude, longitude, place, inaturl) "
                    #             "VALUES (%s, %s, %s, %s, %s, %s);",
                    #             (item['id'], item['time_observed_at'], item['geojson']['coordinates'][1],
                    #             item['geojson']['coordinates'][0], item['place_guess'], item['uri']))

                    # conn.commit()
                    
                    
                    file.write(",")
                    file.write("{{\"type\":\"Feature\",\"properties\":{{\"id\":{},\"time\":"
                            "\"{}\",\"latitude\":{},\"longitude\":"
                            "{},\"place\":\"{}\",\"inaturl\":\"{}\"}}, "
                            "\"geometry\":{{\"type\":\"Point\", \"coordinates\":[{},{}]}}}}".format(item['id'], item['time_observed_at'], item['geojson']['coordinates'][1], item['geojson']['coordinates'][0], item['place_guess'], item['uri'], item['geojson']['coordinates'][0], item['geojson']['coordinates'][1]))
                    
                print('round complete') 
                
            except HTTPError as e:
                print('Error', e)
                break
        
        print('year complete')
            
        # file.seek(0, 2)
        # file.seek(file.tell() - 1, os.SEEK_SET)
        # file.truncate()
        
        file.write("]}")
                
        file.close()
        print('file closed')
                
            # except (Exception, psycopg2.DatabaseError) as error:
            #     print(error)

            # finally:
            #     if conn is not None:
            #         conn.close()
            #         print('Database connection closed.')

spottedlanternfly()