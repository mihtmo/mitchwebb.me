import os
from flask import Flask, redirect, render_template, request

mitchwebb.me = Flask(__name__)

@app.route("/")
def frontpage():
    # Show front page
    return render_template("frontpage.html")

@app.route("/spottedlanternfly")
def spottedlanterfly():
    # Show lanterfly page
    return render_template("spottedlanternfly.html")

@app.route("/me")
def aboutme():
    # Show about me page
    return render_template("me.html")