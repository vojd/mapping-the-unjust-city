from rest_framework import permissions, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api.company import CompanyOwnedCentresSerializer
from api.documents import DocumentSerializer
from centres.models import Company


class OwnerSerializer(serializers.ModelSerializer):
    centres = CompanyOwnedCentresSerializer(many=True, read_only=True, )
    documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('name', 'slug', 'description', 'centres', 'documents',)


@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def get_owners_view(request):
    if request.method == 'GET':
        companies = sorted(set([c for c in Company.objects.all() if c.centres.exists()]), key=lambda k: k.name)
        serializer = OwnerSerializer(companies, many=True)
        return Response(serializer.data)
