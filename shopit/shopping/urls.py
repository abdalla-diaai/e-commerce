from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.products, name='products'),
    path('product_details/<slug:slug>', views.product_details, name='product_details'),
]