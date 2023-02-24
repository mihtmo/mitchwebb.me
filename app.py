from flask import Flask, render_template
from datetime import date, timedelta
from requests import get
import csv
import os
# import psycopg2
import json

app = Flask(__name__, static_url_path='', static_folder='./frontend/static', template_folder='./frontend/templates')

@app.route("/")
def frontpage():
    # Show front page
    return render_template("index.html")


@app.route("/spottedlanternfly")
def slfly():
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
    print(response)
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
    with open('./frontend/static/select_discography.csv', newline='') as f:
        discography_data = list(csv.reader(f))
        disc_count = len(discography_data)

    # Show discography page
    return render_template("discography.html", discographyData = discography_data, discCount = disc_count)


@app.route("/projects")
def projects():
    # Show projects page
    return render_template("projects.html")


@app.route("/touchgrass")
def touchgrass():
    # Show touch grass page
    return render_template("touchgrass.html")

# Presentation for weatherblanket versions
# @app.route("/presentation")
# def presentation():
#     # Show touch grass page
#     return render_template("presentation.html")