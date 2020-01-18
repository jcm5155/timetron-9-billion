from .models import TimeRoutine, TimeSegment
from rest_framework import viewsets, permissions
from .serializers import RoutineSerializer, SegmentSerializer


# TimeRoutine viewset
class RoutineViewSet(viewsets.ModelViewSet):
    queryset = TimeRoutine.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RoutineSerializer

# TimeSegment viewset
class SegmentViewSet(viewsets.ModelViewSet):
    queryset = TimeSegment.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SegmentSerializer