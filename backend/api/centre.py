from rest_framework import serializers, viewsets

from api.company import CompanySerializer
from api.documents import DocumentSerializer
from centres.models import Centre, HistoricalOwner, Image, Tag, DetailPlan


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image',)


class HistoricalOwnerSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = HistoricalOwner
        fields = ('company', 'year', 'price', 'currency',)


class TagSerializer(serializers.ModelSerializer):
    isVisible = serializers.BooleanField(source='is_active', read_only=True)

    class Meta:
        model = Tag
        fields = ('name', 'isVisible',)


class DetailPlanSerializer(serializers.ModelSerializer):
    descriptionEn = serializers.CharField(source='description_en')

    class Meta:
        model = DetailPlan
        fields = ('description', 'descriptionEn', 'image', 'document',)


class CentreSerializer(serializers.HyperlinkedModelSerializer):
    owner = CompanySerializer()
    images = ImageSerializer(many=True, read_only=True, )
    historicalOwners = HistoricalOwnerSerializer(many=True, read_only=True, source='historical_owners')
    documents = DocumentSerializer(many=True, read_only=True)
    detailPlans = DetailPlanSerializer(many=True, read_only=True, source='detail_plans')
    descriptionEn = serializers.CharField(source='description_en')
    # call `get_active_tags` on the Centre model to get only active tags
    tags = TagSerializer(many=True, read_only=True)
    ownershipDescription = serializers.CharField(source='ownership_description')
    ownershipDescriptionEn = serializers.CharField(source='ownership_description_en')

    class Meta:
        model = Centre
        fields = (
            'name',
            'slug',
            'description',
            'descriptionEn',
            'ownershipDescription',
            'ownershipDescriptionEn',
            'status',
            'owner',
            'sold',
            'ownership_type',
            'documents',
            'images',
            'detailPlans',
            'historicalOwners',
            'tags',
        )
        lookup_field = 'slug'


class CentreViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Centre.objects.all()
    serializer_class = CentreSerializer
    lookup_field = 'slug'
