# from django.conf import settings
# from django.conf.urls.static import static
# from django.urls import path,include
# from django.contrib import admin
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     #  path('api/auth/', include('auth_app.urls')),
#     #  path('api/', include('api.urls')),
#     path('', include('stalls.urls')),
    
# ]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_app.urls')),
    path('api/', include('api.urls')),
     path('',include('stalls.urls'))  ,
     path("api/",include('poll.urls')),
      path('api/', include('newsletter.urls')),
      path('',include('stall_booking.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)