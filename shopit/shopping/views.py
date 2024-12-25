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

@decorators.api_view(['GET'])
def product_details(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductDetailsSerializer(product)
    return response.Response(serializer.data)

@decorators.api_view(['POST'])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")
        cart, created = Cart.objects.get_or_create(cart_code=cart_code)
        product = Product.objects.get(id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity = 1
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return response.Response({"data": serializer.data, "message": "Cart item created successfully."}, status=201)
    except Exception as e:
        return response.Response({"error": str(e)}, status=400)
 


