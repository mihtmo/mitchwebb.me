from flask import redirect, render_template, request
import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

def spottedlanternfly():

    return render_template("spottedlanternfly.html")