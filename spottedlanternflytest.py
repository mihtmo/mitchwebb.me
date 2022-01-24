from requests import get
import os
import psycopg2


def spottedlanternfly():

        with open('./static/js/observationsv2_3.js', 'a') as f:

            f.seek(0, 2)
            f.seek(f.tell() - 2, os.SEEK_SET)

            f.write("]}")
        f.close()

spottedlanternfly()