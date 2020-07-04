from index_page.models import Copyright


def copyright_text_func(request):
    copyright_text = Copyright.objects.all().first().text

    return {"copyright_text": copyright_text}
