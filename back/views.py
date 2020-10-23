import urllib.request, json 
from django.http import JsonResponse
from .db_utils import insert, select

def fetch_data():
    with urllib.request.urlopen("https://gist.githubusercontent.com/CesarF/24a0d07afa64532a0ee72b32f554ed8f/raw/ae28ea0e1f9eb4e143d96fe932731d24763beb92/points.json") as url:
        data = json.loads(url.read().decode())
        return data
    return []

def calculate_distance( start:tuple, end:tuple )-> float:
    return ((start[0] - end[0])**2 + (start[1] - end[1])**2)**(1/2)

def get_domiciliary_data(request):
    return JsonResponse(fetch_data(), safe=False)

def get_nearest_domicilary(request, x, y):
    data = fetch_data()
    
    nearest = { 'distance': float('inf') }

    for domicilary in data:
        distance = calculate_distance( (x,y), (int(domicilary["x"]), int(domicilary["y"])) )
        if distance < nearest['distance']:
            nearest['distance'] = distance
            nearest['id'] = domicilary['id']
            nearest['x'] = domicilary['x']
            nearest['y'] = domicilary['y']
            nearest['last-update'] = domicilary['last-update']
    
    nearest['distance'] = round( nearest['distance'], 2 )
    insert( nearest['x'], nearest['y'], nearest['id'] )
    
    return JsonResponse({"nearest":nearest, "others":data }, safe=True)

def get_deliveries(request):
    data = select()
    return JsonResponse(data, safe=False)