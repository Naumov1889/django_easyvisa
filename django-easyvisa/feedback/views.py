from django.shortcuts import render
from django.http import HttpResponse
from feedback.models import FeedbackPhoto, FeedbackVideo


def feedback_page(request):
    feedback_photos = FeedbackPhoto.objects.all()
    feedback_videos = FeedbackVideo.objects.all()

    return render(request, 'feedback/feedback.html',
                  {
                      'feedback_photos': feedback_photos,
                      'feedback_videos': feedback_videos
                  })
