import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

try:
    con = psycopg2.connect(dbname='postgres', user='postgres', host='localhost', password='shehab123')
    con.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = con.cursor()
    cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'turfally'")
    exists = cursor.fetchone()
    if not exists:
        cursor.execute("CREATE DATABASE turfally")
        print("Database 'turfally' created successfully.")
    else:
        print("Database 'turfally' already exists.")
    cursor.close()
    con.close()
except Exception as e:
    print(f"Error connecting to Postgres or creating DB: {e}")
