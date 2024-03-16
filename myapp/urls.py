from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PessoaViewSet

router = DefaultRouter()
router.register(r'pessoas', PessoaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
