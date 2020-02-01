from rest_framework import routers
from .api import RoutineViewSet, SegmentViewSet

router = routers.DefaultRouter()
router.register('api/routines', RoutineViewSet, 'routines')
router.register('api/segments', SegmentViewSet, 'segments')

urlpatterns = router.urls