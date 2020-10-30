import urllib.request, json
from jsonschema import validate


def validate_delivery_input(data):
    """
    Validates if data has an appropiated format
    """

    response = ""

    schema = {
        "type" : "object",
        "properties" : {
            "x" : {"type" : "number"},
            "y" : {"type" : "number"},
        },
        "required": ["x", "y"],
        "minProperties": 2,
        "maxProperties": 2
    }

    try:
        validate(instance=data, schema=schema)
        response = "OK"

    except Exception as e:
        response = str( e ).replace("\n", " ").replace("  ", " ")
    
    return response



def fetch_data():
    data = []
    try:
        with urllib.request.urlopen("https://gist.githubusercontent.com/CesarF/24a0d07afa64532a0ee72b32f554ed8f/raw/ae28ea0e1f9eb4e143d96fe932731d24763beb92/points.json") as url:
            data = json.loads(url.read().decode())
    except:
        data.append({})
    finally:
        return data


def calculate_distance( start:tuple, end:tuple )-> float:
    return ((start[0] - end[0])**2 + (start[1] - end[1])**2)**(1/2)


def get_nearest_domicilary(x, y):
    domicilaries = fetch_data()
    
    nearest = { 'distance': float('inf') }

    for domicilary in domicilaries:
        distance = calculate_distance( (x,y), (int(domicilary["x"]), int(domicilary["y"])) )
        if distance < nearest['distance']:
            nearest['distance'] = distance
            nearest['id'] = domicilary['id']
            nearest['x'] = domicilary['x']
            nearest['y'] = domicilary['y']
            nearest['last-update'] = domicilary['last-update']
    
    nearest['distance'] = round( nearest['distance'], 2 )

    return nearest