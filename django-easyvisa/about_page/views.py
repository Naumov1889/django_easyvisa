from django.shortcuts import render
from about_page.models import AboutPageFeature, Video, History, Requisite

def about_page(request):
    features = AboutPageFeature.objects.all()
    video = Video.objects.all().first()
    histories = History.objects.all()
    requisites = Requisite.objects.all().first()

    return render(request, 'about_page/about.html',
                  {
                      'features': features,
                      'video': video,
                      'histories': histories,
                      'requisites': requisites
                  })
