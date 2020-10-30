from django.conf.urls import url 
from api import views 
 
urlpatterns = [ 
    # GET all domiciliaries data
    url('api/domiciliaries', views.get_domiciliaries),
    
    # GET all deliveries information
    url('api/deliveries', views.get_deliveries),
    
    # POST a new delivery and retreives the nearest domiciliary info 
    url('api/delivery', views.post_delivery),
]