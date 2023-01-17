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
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Create your views here.
# class StudentList(ListAPIView):
    # queryset = Student.objects.all()
    # serializer_class = StudentSerializer
def closing_graph(df, ticker):
    plt.plot(df['Close'])
    plt.xlabel('Date')
    plt.ylabel('Closing Price')
    plt.title(f'{ticker} Close Price')
    plt.savefig(f'media/close/{ticker}.png')

def moving_average(df, ticker):
    ma_day = [10, 20, 50]
    columns = {}
    for ma in ma_day:
        column_name = f"MA for {ma} days"
        columns[column_name] = df['Adj Close'].rolling(ma).mean()
    plt.plot(df['Adj Close'])
    plt.plot(columns["MA for 10 days"], 'r')
    plt.plot(columns["MA for 20 days"], 'g')
    plt.plot(columns["MA for 50 days"], 'o')
    plt.title("Moving average for 10, 20, 50 days")
    plt.savefig(f'media/ma/{ticker}.png')

def adjacent_close(df, ticker):
    daily_return = df['Adj Close'].pct_change()
    plt.plot(daily_return, linestyle='--', marker='o')
    plt.title("Daily Return")
    plt.savefig(f'media/adj_close/{ticker}.png')
    # Daily Return
    hist = daily_return.hist(bins=50)
    plt.xlabel('Daily Return')
    plt.ylabel('Counts')
    plt.title("Daily Return")
    plt.savefig(f'media/daily_return/{ticker}.png')

def closing_price_history(df, ticker):
    plt.figure(figsize=(16,6))
    plt.title('Close Price History')
    plt.plot(df['Close'])
    plt.xlabel('Date', fontsize=18)
    plt.ylabel('Close Price USD ($)', fontsize=18)
    plt.savefig(f'media/closing_price_history/{ticker}.png')

def train_model(df, ticker):
    data = df.filter(['Close'])
    # Convert the dataframe to a numpy array
    dataset = data.values
    # Get the number of rows to train the model on
    training_data_len = int(np.ceil( len(dataset) * .95 ))
    # Scale Data
    scaler = MinMaxScaler(feature_range=(0,1))
    scaled_data = scaler.fit_transform(dataset)
    # Create the training data set 
    # Create the scaled training data set
    train_data = scaled_data[0:int(training_data_len), :]
    # Split the data into x_train and y_train data sets
    x_train = []
    y_train = []

    for i in range(60, len(train_data)):
        x_train.append(train_data[i-60:i, 0])
        y_train.append(train_data[i, 0])
        
    # Convert the x_train and y_train to numpy arrays 
    x_train, y_train = np.array(x_train), np.array(y_train)

    # Reshape the data
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))


def display_stock(request):
    # if request.method == 'POST':
        ticker = request.GET.get('ticker')
        end = datetime.now()
        start = datetime(end.year - 1, end.month, end.day)
        stock = yf.download(ticker, start, end)
        df = pd.DataFrame(stock)
        # Closing Graph
        closing_graph(df, ticker)
        # Moving Average
        moving_average(df, ticker)
        # Adjacent Close
        adjacent_close(df, ticker)
        # Closing Price History
        closing_price_history(df, ticker)
        # Train Data Model
        train_model(df, ticker)
        stock_json = json.loads(stock.to_json())
        stock_json['file_name'] = f"{ticker}.png"
        return JsonResponse(stock_json, safe=False)
        # return render(request, 'stock.html', context)
    # else:
        # return render(request, 'input.html')

