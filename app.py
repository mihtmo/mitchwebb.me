from flask import Flask, render_template
from datetime import date, timedelta
from requests import get
import csv
import os
# import psycopg2
import json

app = Flask(__name__, static_url_path='', static_folder='frontend/static', template_folder='frontend/templates')

@app.route("/")
def frontpage():
    # Show front page
    return render_template("index.html")


@app.route("/spottedlanternfly")
def slfly():
    
    ### Original Database Method Abandoned after Heroku Changed Pricing ###
    # # Establish connection with Heroku PSQL DB
    # DATABASE_URL = os.environ.get('HEROKU_POSTGRESQL_COPPER_URL')
    # conn = psycopg2.connect(DATABASE_URL)
    
    # try:
    #     # Create cursor
    #     cur = conn.cursor()
    #     # See if there are any rows in databas
    #     cur.execute("SELECT EXISTS (SELECT 1 FROM observations)")
    #     ispopulated = cur.fetchall()
        
    #     # If database is empty, just load page
    #     if ispopulated == False:
    #         print("No new rows in database")
        
    #     # If database contains rows, add any missing data points to file on Heroku
    #     else:
    #         with open('static/js/observations.js', 'r+') as f:
    #             # This could be done more efficiently (if it made much of a difference) by only reading
    #             # the number of instances of the string "Feature", multiplied by the value of rowcount from
    #             # the END of the file, and loading that chunk into readfile.
    #             cur.execute("SELECT * FROM observations")
    #             observationstable = cur.fetchall()
    #             readfile = f.read()
    #             # Prepare file for new data
    #             f.seek(0, 2)
    #             f.seek(f.tell() - 2, os.SEEK_SET)
    #             f.truncate()
    #             for row in observationstable:
    #                 currentID = row[0]
    #                 # Check if new data has already been added
    #                 print(currentID)
    #                 if str(currentID) in readfile: 
    #                     print("Observations already contained in dataset")
    #                     continue
    #                 else: 
    #                     print("New data:")
    #                     f.write(",")
    #                     f.write(f"{{\"type\":\"Feature\",\"properties\":{{\"id\":{row[0]},\"time\":"
    #                             f"\"{row[1]}\",\"latitude\":{row[2]},\"longitude\":"
    #                             f"{row[3]},\"place\":\"{row[4]}\",\"inaturl\":\"{row[5]}\","
    #                             f"}}, \"geometry\":{{\"type\":\"Point\", "
    #                             f"\"coordinates\":[{row[3]},{row[2]}]}}}}")
    #             # Close file syntax
    #             f.write("]}")
    #             f.close()

    # except (Exception, psycopg2.DatabaseError) as error:
    #     print(error)

    # finally:
    #     if conn is not None:
    #         conn.close()
    #         print('Database connection closed')
    # Open QGIS map
    return render_template("lanternfly.html")


@app.route("/me")
def aboutme():
    # Show about me page
    return render_template("me.html")


@app.route("/contact")
def contact():
    # Show contact page
    return render_template("contact.html")


@app.route("/weatherblanket", methods=['GET', 'POST'])
def wblanket():
    
    today = date.today()
    delta = timedelta(days = 365)
    first_day = today - delta
    
    # Connect to NCEI API for 2022
    site = "https://www.ncei.noaa.gov/access"
    endpoint = "/services/data/v1?dataset=global-summary-of-the-day&stations=72254413958&" \
               "startDate={}&endDate={}&dataTypes=MAX,MIN,PRCP&format=json".format(first_day, today)

    response = get("{}{}".format(site, endpoint))
    weatherdata = response.json()
    
    # Intialize list for calculating max rain
    rain_list = []
    daynum = len(weatherdata)
    
    # Add each rain value to list
    for day in weatherdata:
        rain_list.append(day['PRCP'])
      
    # Sort list with max rain at top and take value  
    rain_list.sort(reverse=True)
    max_rain = rain_list[0]
        
    #Show weatherblanket page
    return render_template("weatherblanket.html", weatherdata=weatherdata, daynum=daynum, max_rain=max_rain)


@app.route("/discography", methods=['GET', 'POST'])
def discography():

    # Open select_discography.csv and read into variable
    with open('frontend/static/select_discography.csv', newline='') as csvfile:
        discographydata = list(csv.reader(csvfile))
        disccount = len(discographydata)

    # Show discography page
    return render_template("discography.html", discographydata = discographydata, disccount = disccount)


@app.route("/projects")
def projects():
    
    # Show projects page
    return render_template("projects.html")


@app.route("/touchgrass")
def touchgrass():
    
    # Show touch grass page
    return render_template("touchgrass.html")

@app.route("/presentation")
def presentation():
    
    # Show touch grass page
    return render_template("presentation.html")