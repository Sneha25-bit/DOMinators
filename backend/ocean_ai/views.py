from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .predictions import sea_level

@api_view(['POST'])
@permission_classes([AllowAny])
def sea_level_api(request):
    year = request.data.get('year')
    try:
        year = int(year)
        if year < 1993 or year > 2100:
            return Response({"error": "Year must be between 1993 and 2100."}, status=400)
    except (TypeError, ValueError):
        return Response({"error": "Invalid year provided."}, status=400)

    prediction = sea_level(year)
    return Response({"sea_level_mm": round(prediction, 2)})
