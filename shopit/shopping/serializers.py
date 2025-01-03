from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductDetailsSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "name", "price", "slug", "image", "description", "similar_products"]

    def get_similar_products(self, product):
        products = Product.objects.filter(category=product.category).exclude(id=product.id)
        serializer = ProductSerializer(products, many=True)
        return serializer.data
  
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "quantity", "product", "total"] 
    def get_total(self, cart_item):
        price = cart_item.product.price * cart_item.quantity
        return price


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "cart_code", "items", "num_of_items", "sum_total", "created_at", "updated_at"]
    def get_sum_total(self, cart):
        total = sum([item.product.price * item.quantity for item in cart.items.all()])
        return total
    
    def get_num_of_items(self, cart):
        items_num = sum([item.quantity for item in cart.items.all()])
        return items_num

# return number of items in the cart
class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id", "cart_code", "num_of_items"]
    
    def get_num_of_items(self, cart):
        items_num = sum([item.quantity for item in cart.items.all()])
        return items_num

class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", input_formats=None)

    class Meta:
        # currently used model
        model = get_user_model()
        fields = ["id", "username", "email", "first_name", "last_name", "city", "state", "address", "phone", "date_joined"]