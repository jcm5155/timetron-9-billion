from django.contrib import admin
from .models import TimeRoutine, TimeSegment

# Register your models here.
admin.site.register(TimeRoutine)
admin.site.register(TimeSegment)