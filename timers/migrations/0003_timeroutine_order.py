# Generated by Django 3.0.2 on 2020-01-26 00:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timers', '0002_auto_20200118_0308'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeroutine',
            name='order',
            field=models.CharField(default=[], max_length=500),
            preserve_default=False,
        ),
    ]
