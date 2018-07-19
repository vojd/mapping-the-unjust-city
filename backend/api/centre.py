from django.template.defaultfilters import slugify
from rest_framework import serializers, viewsets

from centres.models import Centre


class CentreSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(
        view_name='api:company-detail',
        lookup_field='slug',
        read_only=True,
    )

    documents = serializers.HyperlinkedRelatedField(
        view_name='api:document-detail',
        lookup_field='pk',
        many=True,
        read_only=True
    )

    class Meta:
        model = Centre
        fields = ('slug', 'name', 'description', 'status', 'owner', 'documents',)
        lookup_field = 'slug'


class CentreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Centre.objects.all()
    serializer_class = CentreSerializer
    lookup_field = 'slug'
