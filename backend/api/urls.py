from django.conf.urls import url
from django.urls import include
from rest_framework import routers, serializers, viewsets

from centres.models import Centre, Company, CentreDocument


class CentreDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CentreDocument
        fields = ('title', 'text', 'file',)


class CentreDocumentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CentreDocument.objects.all()
    serializer_class = CentreDocumentSerializer


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    centres = serializers.HyperlinkedRelatedField(
        view_name='api:centre-detail',
        lookup_field='slug',
        many=True,
        read_only=True,
    )

    class Meta:
        model = Company
        fields = ('name', 'slug', 'text', 'centres',)
        lookup_field = 'company.slug'


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'slug'


class CentreSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(
        view_name='api:company-detail',
        lookup_field='slug',
        read_only=True,
    )

    documents = serializers.HyperlinkedRelatedField(
        view_name='api:centredocument-detail',
        lookup_field='pk',
        many=True,
        read_only=True
    )

    class Meta:
        model = Centre
        fields = ('name', 'slug', 'status', 'owner', 'documents', )
        lookup_field = 'slug'


class CentreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Centre.objects.all()
    serializer_class = CentreSerializer
    lookup_field = 'slug'


router = routers.DefaultRouter()
router.register(r'centre', CentreViewSet, )
router.register(r'company', CompanyViewSet, )
router.register(r'centredocument', CentreDocumentViewSet, )

urlpatterns = [
    url(r'^', include(router.urls)),
]
