<h1>Daily Sales Report</h1>

@if($sales->isEmpty())
    <p>No products sold today.</p>
@else
    <table border="1" cellpadding="5" cellspacing="0">
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Amount</th>
        </tr>
        @foreach($sales as $sale)
            <tr>
                <td>{{ $sale->product->name }}</td>
                <td>{{ $sale->quantity }}</td>
                <td>{{ $sale->quantity * $sale->price }}</td>
            </tr>
        @endforeach
    </table>
@endif
