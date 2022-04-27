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
        # See if there are any rows in databas
        cur.execute("SELECT EXISTS (SELECT 1 FROM observations)")
        ispopulated = cur.fetchall()
        
        # If database is empty, just load page
        if ispopulated == False:
            print("No new rows in database")
        
        # If database contains rows, add any missing data points to file on Heroku
        else:
            with open('static/js/observations.js', 'r+') as f:
                # This could be done more efficiently (if it made much of a difference) by only reading
                # the number of instances of the string "Feature", multiplied by the value of rowcount from
                # the END of the file, and loading that chunk into readfile.
                cur.execute("SELECT * FROM observations")
                observationstable = cur.fetchall()
                readfile = f.read()
                # Prepare file for new data
                f.seek(0, 2)
                f.seek(f.tell() - 2, os.SEEK_SET)
                f.truncate()
                for row in observationstable:
                    currentID = row[0]
                    # Check if new data has already been added (only need to check one)
                    print(currentID)
                    if str(currentID) in readfile: 
                        print("New observations already contained in dataset")
                        break
                    else: 
                        print("New data:")
                        f.write(",")
                        f.write(f"{{\"type\":\"Feature\",\"properties\":{{\"id\":{row[0]},\"time\":"
                                f"\"{row[1]}\",\"latitude\":{row[2]},\"longitude\":"
                                f"{row[3]},\"place\":\"{row[4]}\",\"inaturl\":\"{row[5]}\","
                                f"\"photos\":\"{row[6]}\"}}, \"geometry\":{{\"type\":\"Point\", "
                                f"\"coordinates\":[{row[3]},{row[2]}]}}}}")
                # Close file syntax
                f.write("]}")
                f.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed')
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

@mitchwebb.route("/weatherblanket", methods=['GET', 'POST'])
def wblanket():
    
    # Establish connection with Heroku PostgreSQL
    DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')
    
    conn = None
    
    try:
        # Establish database connection
        conn = psycopg2.connect(DATABASE_URL)

        # Create cursor
        cur = conn.cursor()

        cur.execute("SELECT (date::VARCHAR(19)), temp_hi, temp_lo, visib, rain FROM weatherdata")
        fulltable = cur.fetchall()
        daynum = len(fulltable)
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed')
            
    #Show weatherblanket page
    return render_template("weatherblanket.html", fulltable = fulltable, daynum = daynum)