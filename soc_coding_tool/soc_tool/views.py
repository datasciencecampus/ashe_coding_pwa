from django.shortcuts import render

def index(request):
    return render(request, 'soc_tool/index.html')