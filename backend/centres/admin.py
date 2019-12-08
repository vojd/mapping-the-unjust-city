from django.contrib import admin

from centres.models import Company, Document, Centre, Image, HistoricalOwner, Tag


class ImageInline(admin.StackedInline):
    model = Image
    extra = 0
    fields = ('centre', 'image')


class DocumentInline(admin.StackedInline):
    model = Document
    extra = 0
    fields = ('centre', 'title', 'text', 'file')


class OwnershipHistoryInline(admin.StackedInline):
    model = HistoricalOwner
    extra = 0
    fields = ('name', 'year', 'price', 'currency',)


@admin.register(Centre)
class CentreAdmin(admin.ModelAdmin):
    inlines = [ImageInline, DocumentInline, OwnershipHistoryInline]

    prepopulated_fields = {'slug': ('name',)}


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    inlines = [ImageInline, DocumentInline, ]


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    extra = 2


admin.site.site_title = 'Mapping the unjust city'
admin.site.site_header = 'Mapping the unjust city'
