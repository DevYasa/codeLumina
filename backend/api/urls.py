from django.urls import path
from .views import CodeExplanationView

urlpatterns = [
    path('explain/', CodeExplanationView.as_view(), name='explain_code'),
]