from rest_framework import serializers, viewsets

from api.centre import CentreSerializer
from centres.models import Document


class DocumentSerializer(serializers.ModelSerializer):
    centre = CentreSerializer()

    class Meta:
        model = Document
        fields = ('centre', 'company', 'title', 'text', 'file',)


class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
