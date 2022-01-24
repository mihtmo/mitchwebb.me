from flask import Flask, redirect, render_template, request
from spottedlanternfly import spottedlanternfly

mitchwebb = Flask(__name__)

@mitchwebb.route("/")
def frontpage():
    # Show front page
    return render_template("index.html")

@mitchwebb.route("/spottedlanternfly")
def slfly():
    # Open QGIS map
    return render_template("newlanternfly.html")

@mitchwebb.route("/me")
def aboutme():
    # Show about me page
    return render_template("me.html")
