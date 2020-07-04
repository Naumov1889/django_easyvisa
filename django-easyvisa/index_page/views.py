from django.shortcuts import render
from index_page.models import PopularDestination, Staff, EnglishCoursePrice
from feedback.models import FeedbackPhoto


def index_page(request):
    popular_destinations = PopularDestination.objects.all()
    staff = Staff.objects.all()
    english_course_price = EnglishCoursePrice.objects.all().first().price
    feedback_photos = FeedbackPhoto.objects.all()[:10]

    return render(request, "index_page/index.html",
                  {
                      'popular_destinations': popular_destinations,
                      'staff': staff,
                      'english_course_price': english_course_price,
                      'feedback_photos': feedback_photos
                  })
