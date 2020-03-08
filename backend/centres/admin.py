from django.contrib import admin

from centres.models import Company, Document, Centre, Image, HistoricalOwner, Tag, DetailPlan


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
    fields = ('company', 'year', 'price', 'currency',)


class DetailPlanInline(admin.StackedInline):
    model = DetailPlan
    extra = 0
    fields = ('description', 'image', 'document', )


@admin.register(Centre)
class CentreAdmin(admin.ModelAdmin):
    inlines = [ImageInline, DocumentInline, OwnershipHistoryInline, DetailPlanInline]

    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'owner', 'get_tags',)
    list_filter = ('tags',)

    def get_tags(self, obj):
        return ', '.join([s.name for s in obj.tags.all()])


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    inlines = [ImageInline, DocumentInline, ]

    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'description',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    extra = 2


admin.site.site_title = 'Mapping the unjust city'
admin.site.site_header = 'Mapping the unjust city'
