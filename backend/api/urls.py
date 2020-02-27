from django.conf.urls import url
from django.urls import include, path
from rest_framework import routers

from api.centre import CentreViewSet
from api.company import CompanyViewSet
from api.documents import DocumentViewSet, TagViewSet
from api.owner import get_owners_view

router = routers.DefaultRouter()
router.register(r'centre', CentreViewSet, )
router.register(r'company', CompanyViewSet, )
router.register(r'document', DocumentViewSet, )
router.register(r'tag', TagViewSet, )

urlpatterns = [
    url(r'^', include(router.urls)),
    path('owner/', get_owners_view),
]
