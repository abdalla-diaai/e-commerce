from django.shortcuts import render
from rest_framework import viewsets, decorators, response
from .models import *
from .serializers import *

# Create your views here.

@decorators.api_view(['GET'])
def products(request):
    products = Product.objects.all()

    # expecting more than one product
    serializer = ProductSerializer(products, many=True)
    return response.Response(serializer.data)