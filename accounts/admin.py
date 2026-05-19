from django.contrib import admin
from .models import AthleteProfile

@admin.register(AthleteProfile)
class AthleteProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'matches', 'win_rate', 'mvp', 'member_type')
    list_filter = ('member_type',)
    search_fields = ('user__username',)
