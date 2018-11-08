from rest_framework import viewsets, serializers

from centres.models import Company, Centre


class CompanyOwnedCentresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Centre
        fields = ('name', 'slug',)


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    centres = CompanyOwnedCentresSerializer(many=True, read_only=True,)

    documents = serializers.HyperlinkedRelatedField(
        view_name='api:document-detail',
        lookup_field='pk',
        many=True,
        read_only=True
    )

    class Meta:
        model = Company
        fields = ('name', 'slug', 'description', 'centres', 'documents',)
        lookup_field = 'company.slug'


class CompanyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'slug'
