from django.contrib import admin
from .models import *

# Register your models here.
class CustomerUserAdmin(admin.ModelAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'first_name', 'last_name' 'email', 'city', 'state', 'address', 'phone', 'password1', 'password2'),
        }),
    )

admin.site.register(CustomerUser, CustomerUserAdmin)
