from flask import redirect, render_template, request
from requests import get
import os
import psycopg2

def spottedlanternfly():
    site = "https://www.inaturalist.org"
    endpoint = "/observations.json?orderby=observed_on&license=any&taxon_id=324726&quality_grade=research&swlng=-178.2&swlat=6.6&nelng=-49.0&nelat=83.3&per_page=200"
    response = get(f"{site}{endpoint}")
    observations = response.json()

    return

