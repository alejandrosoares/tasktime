# Generated by Django 3.2.8 on 2021-11-02 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.SmallIntegerField(blank=True, verbose_name='Code')),
                ('title', models.CharField(max_length=30, verbose_name='Title')),
                ('description', models.CharField(blank=True, max_length=70, null=True, verbose_name='Description')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated')),
                ('number_task', models.PositiveSmallIntegerField(verbose_name='Number of Task')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]