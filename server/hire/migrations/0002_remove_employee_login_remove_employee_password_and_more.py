# Generated by Django 5.0.1 on 2024-01-06 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hire', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='login',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='password',
        ),
        migrations.RemoveField(
            model_name='recruter',
            name='login',
        ),
        migrations.RemoveField(
            model_name='recruter',
            name='password',
        ),
        migrations.AddField(
            model_name='employee',
            name='key',
            field=models.CharField(default=0, max_length=50, verbose_name='key'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='recruter',
            name='key',
            field=models.CharField(default=0, max_length=50, verbose_name='key'),
            preserve_default=False,
        ),
    ]
