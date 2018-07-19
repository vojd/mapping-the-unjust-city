from django.conf.urls import url
from django.urls import include
from rest_framework import routers

from api.centre import CentreViewSet
from api.company import CompanyViewSet
from api.documents import DocumentViewSet

router = routers.DefaultRouter()
router.register(r'centre', CentreViewSet, )
router.register(r'company', CompanyViewSet, )
router.register(r'document', DocumentViewSet, )

urlpatterns = [
    url(r'^', include(router.urls)),
]
