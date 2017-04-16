from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import hello.views

from django.conf import settings
from django.conf.urls.static import static


# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', hello.views.index, name='index'),
    url(r'^db', hello.views.db, name='db'),
    url(r'^users', hello.views.users, name='users'),
    url(r'^map-points', hello.views.map_points, name='map_points'),
    url(r'^admin/', include(admin.site.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
