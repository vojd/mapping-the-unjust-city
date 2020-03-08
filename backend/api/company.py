from rest_framework import viewsets, serializers

from api.documents import DocumentSerializer
from centres.models import Company, Centre


class CompanyOwnedCentresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Centre
        fields = ('name', 'slug',)


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    centres = CompanyOwnedCentresSerializer(many=True, read_only=True,)

    documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('name', 'slug', 'description', 'image', 'centres', 'documents',)
        lookup_field = 'company.slug'


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    lookup_field = 'slug'
