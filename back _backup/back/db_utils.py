import psycopg2

def connect():
    # Connection to an existing database
    conn = psycopg2.connect("dbname=deliveries user=postgres password=admin")
    # Cursor to perform database operations
    return conn, conn.cursor()

def close(cur, conn):
    cur.close()
    conn.close()

def insert( x, y, dom_id ):
    connection = connect()
    conn = connection[0]
    cur = connection[1]
    cur.execute("INSERT INTO deliveries (X_dest, Y_dest, domicilary_id) VALUES (%s, %s, %s)", (x, y, dom_id))
    conn.commit()
    close(connection[0], connection[1])

def select():
    connection = connect()
    cur = connection[1]
    cur.execute("SELECT * FROM deliveries;")
    data = cur.fetchall()
    close(connection[0], connection[1])
    obj_list = [{"id": element[2], "x": element[0], "y": element[1]} for element in data]
    return obj_list