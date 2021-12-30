from flask import Flask, redirect, render_template, request

mitchwebb = Flask(__name__)

@mitchwebb.route("/")
def frontpage():
    # Show front page
    return render_template("frontpage.html")


@mitchwebb.route("/spottedlanternfly")
def spottedlanterfly():
    # Show lanterfly page
    return render_template("spottedlanternfly.html")


@mitchwebb.route("/me")
def aboutme():
    # Show about me page
    return render_template("me.html")
