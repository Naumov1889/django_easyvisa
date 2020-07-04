from django.shortcuts import render
from franchise_page.models import Feature, Story, StoryCharacteristic

def franchise_page(request):
    features = Feature.objects.all()
    stories = Story.objects.all()
    story_characteristic = StoryCharacteristic.objects.all()

    return render(request, 'franchise_page/franchise.html',
                  {
                      'features': features,
                      'stories': stories,
                      'story_characteristic': story_characteristic
                  })
