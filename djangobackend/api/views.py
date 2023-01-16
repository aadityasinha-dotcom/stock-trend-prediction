from django.shortcuts import render
from .serializers import StudentSerializer
from rest_framework.generics import ListAPIView
from .models import Student
import yfinance as yf
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
import json
from django.http import JsonResponse

# Create your views here.
# class StudentList(ListAPIView):
    # queryset = Student.objects.all()
    # serializer_class = StudentSerializer
def display_stock(request):
    # if request.method == 'POST':
        ticker = request.GET.get('ticker')
        end = datetime.now()
        start = datetime(end.year - 1, end.month, end.day)
        stock = yf.download(ticker, start, end)
        df = pd.DataFrame(stock)
        plt.plot(df['Close'])
        plt.xlabel('Date')
        plt.ylabel('Close Price')
        plt.title(f'{ticker} Close Price')
        plt.savefig('static/images/stock.png')
        # df.head()
        # fig = plt.figure()
        # ax = fig.add_subplot(111)
        # ax.plot(df.Close)
        # plt.show()
        # context = {'df': df,'ticker': ticker}
        stock_json = json.loads(stock.to_json())
        return JsonResponse(stock_json, safe=False)
        # return render(request, 'stock.html', context)
    # else:
        # return render(request, 'input.html')

