from rest_framework import serializers, viewsets

from centres.models import Document, Tag


class DocumentSerializer(serializers.ModelSerializer):
    # centre = CentreSerializer()

    class Meta:
        model = Document
        fields = ('centre', 'company', 'title', 'text', 'file',)


class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'is_active',)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
