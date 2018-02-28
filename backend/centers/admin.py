from django.contrib import admin

from centers.models import Owner, CentreDocument, Centre, CentreImage


@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    pass


class CentreImageInline(admin.StackedInline):
    model = CentreImage
    extra = 0
    fields = ('centre', 'image')


class CentreDocumentInline(admin.StackedInline):
    model = CentreDocument
    extra = 0
    fields = ('centre', 'title', 'text', 'file')


@admin.register(Centre)
class CentreAdmin(admin.ModelAdmin):
    inlines = [CentreImageInline, CentreDocumentInline]

    prepopulated_fields = {'slug': ('name', )}


admin.site.site_title = 'Mapping the unjust city'
admin.site.site_header = 'Mapping the unjust city'
