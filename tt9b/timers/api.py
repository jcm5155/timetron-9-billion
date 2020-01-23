from .models import TimeRoutine, TimeSegment
from rest_framework import viewsets, permissions
from .serializers import RoutineSerializer, SegmentSerializer


# TimeRoutine viewset
class RoutineViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = RoutineSerializer

    def get_queryset(self):
        return self.request.user.routines.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# TimeSegment viewset
class SegmentViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SegmentSerializer

    def get_queryset(self):
        queryset = TimeSegment.objects.all()
        current_routine_id = self.request.query_params.get('id', None)
        if current_routine_id:
            queryset = queryset.filter(parent=current_routine_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save()