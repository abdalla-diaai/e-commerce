from django.shortcuts import render
from rest_framework import decorators, response, status
from .models import *
from .serializers import *

# Create your views here.
def index(request):
    return render(request, "shopping/index.html")

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
 

@decorators.api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")
    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)
    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()
    return response.Response({"product_in_cart": product_exists_in_cart})

@decorators.api_view(['GET'])
def get_cart_stats(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = SimpleCartSerializer(cart)
    return response.Response(serializer.data)

@decorators.api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = CartSerializer(cart)
    return response.Response(serializer.data)

@decorators.api_view(['PATCH'])
def update_quantity(request):
    try:
        cart_item_id = request.data.get("item_id")
        quantity = request.data.get("quantity")
        quantity = int(quantity)
        cart_item = CartItem.objects.get(id=cart_item_id)
        cart_item.quantity = quantity
        cart_item.save
        serializer = CartItemSerializer(cart_item)
        return response.Response({ "data": serializer.data, "message": "Cart item updated successfully!"})
    except Exception as e:
        return response.Response({'error': str(e)}, status=400)

@decorators.api_view(['POST'])
def delete_cart_item(request):
    cart_item_id = request.data.get("item_id")
    cart_item = CartItem.objects.get(id=cart_item_id)
    cart_item.delete()
    return response.Response(status=status.HTTP_204_NO_CONTENT)




