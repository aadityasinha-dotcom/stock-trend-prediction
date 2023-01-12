from django.shortcuts import render

from django.http import HttpResponse

# Create your views here.
def index(request):
    # return render(request, 'hello.html')
    if request.method == 'GET':
        return render(request, 'hello.html')
    else:
        user_input = request.POST['user_input']
        # do something with the input
        return render(request, 'hello.html', {'user_input': user_input})
