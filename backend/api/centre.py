from rest_framework import serializers, viewsets

from api.company import CompanySerializer
from centres.models import Centre, HistoricalOwner


class HistoricalOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricalOwner
        fields = ('name', 'year', 'price', 'currency',)


class CentreSerializer(serializers.HyperlinkedModelSerializer):
    owner = CompanySerializer()

    documents = serializers.HyperlinkedRelatedField(
        view_name='api:document-detail',
        lookup_field='pk',
        many=True,
        read_only=True
    )

    historicalOwners = HistoricalOwnerSerializer(many=True, read_only=True, source='historical_owners')

    class Meta:
        model = Centre
        fields = (
            'name', 'slug',
            'description', 'status',
            'owner', 'documents',
            'historicalOwners',
        )
        lookup_field = 'slug'


class CentreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Centre.objects.all()
    serializer_class = CentreSerializer
    lookup_field = 'slug'
