from django.shortcuts import render
from index_page.models import PopularDestination, Staff, EnglishCoursePrice, FirstScreenStatistic
from feedback.models import FeedbackPhoto


def index_page(request):
    popular_destinations = PopularDestination.objects.all()
    staff = Staff.objects.all()
    english_course_price = EnglishCoursePrice.objects.all().first().price
    first_screen_statistic = FirstScreenStatistic.objects.all().first()
    feedback_photos = FeedbackPhoto.objects.all()[:10]

    return render(request, "index_page/index.html",
                  {
                      'popular_destinations': popular_destinations,
                      'staff': staff,
                      'english_course_price': english_course_price,
                      'first_screen_statistic': first_screen_statistic,
                      'feedback_photos': feedback_photos
                  })
