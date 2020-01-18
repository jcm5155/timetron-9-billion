from rest_framework import serializers
from .models import TimeRoutine, TimeSegment

class RoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeRoutine
        fields = '__all__'
        read_only_fields = ('date_created', 'plays')

class SegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSegment
        fields = '__all__'