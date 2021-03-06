# Generated by Django 3.0.2 on 2020-01-18 03:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('timers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timeroutine',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='routines', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='timesegment',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='segments', to='timers.TimeRoutine'),
        ),
    ]
