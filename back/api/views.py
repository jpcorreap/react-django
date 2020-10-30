from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
from api.models import Delivery
from api.serializers import DeliverySerializer
from rest_framework.decorators import api_view
import api.logic as logic

# Create your views here.

@api_view(['POST'])
def post_delivery(request):
    data = JSONParser().parse(request)
    
    # Ñapa: it validates if the POSTs body has an appropiated format:
    validation = logic.validate_delivery_input( data )

    if validation == "OK":
        nearest = logic.get_nearest_domicilary(data['x'], data['y'])
        data['id'] = nearest['id']
        serializer = DeliverySerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(nearest, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"detail": validation}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_domiciliaries(request):
    data = logic.fetch_data()
    return JsonResponse(data, safe=False)


@api_view(['GET'])
def get_deliveries(request):
    deliveries = Delivery.objects.all()
    deliveries_serializer = DeliverySerializer(deliveries, many=True)
    return JsonResponse(deliveries_serializer.data, safe=False)