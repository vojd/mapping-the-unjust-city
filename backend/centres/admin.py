from django.contrib import admin

from centres.models import Company, Document, Centre, Image


class ImageInline(admin.StackedInline):
    model = Image
    extra = 0
    fields = ('centre', 'image')


class DocumentInline(admin.StackedInline):
    model = Document
    extra = 0
    fields = ('centre', 'title', 'text', 'file')


@admin.register(Centre)
class CentreAdmin(admin.ModelAdmin):
    inlines = [ImageInline, DocumentInline]

    prepopulated_fields = {'slug': ('name',)}


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    inlines = [ImageInline, DocumentInline]


admin.site.site_title = 'Mapping the unjust city'
admin.site.site_header = 'Mapping the unjust city'
