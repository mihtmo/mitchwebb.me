from flask import Flask, render_template
import os
import psycopg2

mitchwebb = Flask(__name__)

@mitchwebb.route("/")
def frontpage():
    # Show front page
    return render_template("index.html")

@mitchwebb.route("/spottedlanternfly")
def slfly():
    
    # This is a workaround of sorts in order to remain in the free tier of Heroku for longer.
    # Also Heroku does not support any sort of persistant file storage.
    # By storing around 8000 rows in a js variable, this map is now able to support 18,000 datapoints
    # for free (at the cost of processing time). Not optimal, but free.
    # Given more time, I would utilize redis or MongoDB as a permanent data-storage method.
    
    # Establish connection with Heroku PSQL DB
    DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')
    conn = psycopg2.connect(DATABASE_URL)
    try:
        # Create cursor
        cur = conn.cursor()
        cur.execute("SELECT * FROM observations")
        observationstable = cur.fetchall()
        
        with open('static/js/observations.js', 'r+') as f:

            for row in observationstable:
                currentID = row[0]
                # read file content
                readfile = f.read()
                # checking condition for string found or not
                if str(currentID) in readfile: 
                    print("Observation already contained in dataset")
                    continue
                else: 
                    print("Inserting extra data")
                    f.seek(0, 2)
                    f.seek(f.tell() - 2, os.SEEK_SET)
                    f.truncate()
                    f.write(",")
                    # f.write(f"{{\"type\":\"Feature\",\"properties\":{{\"id\":{row['id']},\"time\":"
                    #         f"\"{row['time_observed_at_utc']}\",\"latitude\":{row['latitude']},\"longitude\":"
                    #         f"{row['longitude']},\"place\":\"{row['place_guess']}\",\"inaturl\":\"{row['uri']}\","
                    #         f"\"photos\":\"{row['photos'][0]['medium_url']}\"}}, \"geometry\":{{\"type\":\"Point\", "
                    #         f"\"coordinates\":[{row['longitude']},{row['latitude']}]}}}}")
                    f.write(f"{{\"type\":\"Feature\",\"properties\":{{\"id\":{row[0]},\"time\":"
                            f"\"{row[1]}\",\"latitude\":{row[2]},\"longitude\":"
                            f"{row[3]},\"place\":\"{row[4]}\",\"inaturl\":\"{row[5]}\","
                            f"\"photos\":\"{row[6]}\"}}, \"geometry\":{{\"type\":\"Point\", "
                            f"\"coordinates\":[{row[3]},{row[2]}]}}}}")
                    f.write("]}")
            f.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')
    # Open QGIS map
    return render_template("lanternfly.html")

@mitchwebb.route("/me")
def aboutme():
    # Show about me page
    return render_template("me.html")

@mitchwebb.route("/contact")
def contact():
    # Show contact page
    return render_template("contact.html")
